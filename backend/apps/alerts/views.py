from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Count, Q
from .models import Alert
from .serializers import AlertSerializer, AlertSummarySerializer


class AlertViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de alertas.
    """
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar alertas del usuario autenticado."""
        # Swagger fake view bypass
        if getattr(self, 'swagger_fake_view', False):
            return Alert.objects.none()
        
        queryset = Alert.objects.filter(user=self.request.user).select_related('metric')
        
        # Filtros opcionales
        alert_type = self.request.query_params.get('type')
        level = self.request.query_params.get('level')
        is_read = self.request.query_params.get('is_read')
        
        if alert_type:
            queryset = queryset.filter(alert_type=alert_type)
        if level:
            queryset = queryset.filter(level=level)
        if is_read is not None:
            queryset = queryset.filter(is_read=is_read.lower() == 'true')
        
        return queryset
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """
        Marca una alerta como leída.
        
        POST /api/v1/alerts/{id}/mark_read/
        """
        alert = self.get_object()
        alert.is_read = True
        alert.read_at = timezone.now()
        alert.save()
        
        serializer = self.get_serializer(alert)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """
        Marca todas las alertas no leídas como leídas.
        
        POST /api/v1/alerts/mark_all_read/
        """
        updated = self.get_queryset().filter(is_read=False).update(
            is_read=True,
            read_at=timezone.now()
        )
        
        return Response({
            'message': f'{updated} alertas marcadas como leídas.',
            'updated': updated
        })
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen de alertas del día actual.
        
        GET /api/v1/alerts/summary/
        """
        today = timezone.now().date()
        queryset = self.get_queryset().filter(created_at__date=today)
        
        # Contar por nivel
        counts = queryset.aggregate(
            total=Count('id'),
            unread=Count('id', filter=Q(is_read=False)),
            critical=Count('id', filter=Q(level='critical')),
            high=Count('id', filter=Q(level='high')),
            medium=Count('id', filter=Q(level='medium')),
            low=Count('id', filter=Q(level='low')),
        )
        
        # Contar por tipo
        by_type = {}
        for alert_type in ['fatigue', 'health', 'productivity', 'safety']:
            by_type[alert_type] = queryset.filter(alert_type=alert_type).count()
        
        data = {
            'date': today,
            'total': counts['total'],
            'unread': counts['unread'],
            'critical': counts['critical'],
            'high': counts['high'],
            'medium': counts['medium'],
            'low': counts['low'],
            'by_type': by_type,
        }
        
        serializer = AlertSummarySerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recommendations(self, request):
        """
        Obtiene recomendaciones de IA basadas en alertas recientes.
        
        GET /api/v1/alerts/recommendations/
        """
        # Obtener alertas de los últimos 7 días
        week_ago = timezone.now() - timezone.timedelta(days=7)
        recent_alerts = self.get_queryset().filter(created_at__gte=week_ago)
        
        # Analizar patrones (lógica simplificada, aquí iría ML real)
        fatigue_count = recent_alerts.filter(alert_type='fatigue').count()
        stress_count = recent_alerts.filter(alert_type='health', message__icontains='estrés').count()
        
        recommendations = []
        
        if fatigue_count > 3:
            recommendations.append({
                'icon': 'sleep',
                'text': 'Considera aumentar tus horas de descanso. Has tenido varias alertas de fatiga esta semana.'
            })
        
        if stress_count > 2:
            recommendations.append({
                'icon': 'meditation',
                'text': 'Practica técnicas de relajación. Tus niveles de estrés han sido elevados.'
            })
        
        recommendations.append({
            'icon': 'water',
            'text': 'Mantente hidratado durante tu turno para mejorar tu rendimiento.'
        })
        
        return Response({
            'date': timezone.now().date(),
            'recommendations': recommendations
        })
