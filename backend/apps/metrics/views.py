from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db.models import Avg, Q, Count
from .models import Metric, MetricType
from .serializers import (
    MetricSerializer, 
    MetricTypeSerializer, 
    MetricCreateSerializer,
    MetricSummarySerializer, 
    TrendsSerializer
)


class MetricTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para tipos de métricas.
    
    GET /api/metric-types/ - Lista todos los tipos de métricas
    GET /api/metric-types/{code}/ - Detalle de un tipo específico
    """
    queryset = MetricType.objects.filter(is_active=True)
    serializer_class = MetricTypeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'code'


class MetricViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de métricas fisiológicas con estructura normalizada.
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar métricas del usuario autenticado."""
        if getattr(self, 'swagger_fake_view', False):
            return Metric.objects.none()
        
        return Metric.objects.filter(
            user=self.request.user
        ).select_related(
            'metric_type', 
            'wearable', 
            'work_session'
        )
    
    def get_serializer_class(self):
        """Usar serializer simplificado para crear métricas."""
        if self.action == 'create':
            return MetricCreateSerializer
        return MetricSerializer
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen de las últimas métricas del usuario por tipo.
        
        GET /api/metrics/summary/
        """
        user = request.user
        summary = []
        
        # Obtener la última métrica de cada tipo
        metric_types = MetricType.objects.filter(is_active=True)
        
        for metric_type in metric_types:
            latest = Metric.objects.filter(
                user=user,
                metric_type=metric_type
            ).order_by('-timestamp').first()
            
            if latest:
                # Calcular cambio vs métrica anterior
                previous = Metric.objects.filter(
                    user=user,
                    metric_type=metric_type,
                    timestamp__lt=latest.timestamp
                ).order_by('-timestamp').first()
                
                change_percentage = None
                if previous and previous.value and latest.value:
                    change_percentage = ((latest.value - previous.value) / previous.value) * 100
                
                summary.append({
                    'metric_type': metric_type.code,
                    'metric_name': metric_type.name,
                    'current_value': latest.value,
                    'unit': metric_type.unit,
                    'stress_category': latest.stress_category,
                    'change_percentage': round(change_percentage, 2) if change_percentage else None,
                    'timestamp': latest.timestamp,
                })
        
        serializer = MetricSummarySerializer(summary, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """
        Estadísticas de métricas en un rango de fechas.
        
        GET /api/metrics/statistics/?start_date=2024-01-01&end_date=2024-01-31&metric_type=heart_rate
        """
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        metric_type_code = request.query_params.get('metric_type')
        
        if not all([start_date, end_date]):
            return Response(
                {'error': 'Se requieren start_date y end_date'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        filters = Q(user=request.user, timestamp__date__gte=start_date, timestamp__date__lte=end_date)
        
        if metric_type_code:
            filters &= Q(metric_type__code=metric_type_code)
        
        metrics = self.get_queryset().filter(filters)
        
        if not metrics.exists():
            return Response({'message': 'No hay métricas en el rango especificado'})
        
        stats = metrics.aggregate(
            avg_value=Avg('value'),
            count=Count('id')
        )
        
        # Agrupar por tipo si no se especificó uno
        if not metric_type_code:
            by_type = {}
            for metric_type in MetricType.objects.filter(is_active=True):
                type_metrics = metrics.filter(metric_type=metric_type)
                if type_metrics.exists():
                    type_stats = type_metrics.aggregate(avg_value=Avg('value'))
                    by_type[metric_type.code] = {
                        'name': metric_type.name,
                        'unit': metric_type.unit,
                        'average': round(type_stats['avg_value'], 2) if type_stats['avg_value'] else None,
                        'count': type_metrics.count()
                    }
            
            return Response({
                'start_date': start_date,
                'end_date': end_date,
                'total_records': stats['count'],
                'by_type': by_type
            })
        
        return Response({
            'start_date': start_date,
            'end_date': end_date,
            'metric_type': metric_type_code,
            'average': round(stats['avg_value'], 2) if stats['avg_value'] else None,
            'count': stats['count']
        })
