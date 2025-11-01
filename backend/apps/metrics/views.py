from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db.models import Avg
from .models import Metric
from .serializers import MetricSerializer, MetricSummarySerializer, TrendsSerializer


class MetricViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de métricas fisiológicas.
    """
    serializer_class = MetricSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar métricas del usuario autenticado."""
        # Swagger fake view bypass
        if getattr(self, 'swagger_fake_view', False):
            return Metric.objects.none()
        
        return Metric.objects.filter(user=self.request.user).select_related('wearable', 'work_session', 'task')
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """
        Obtiene las métricas del día actual con comparación vs día anterior.
        
        GET /api/v1/metrics/today/
        """
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        
        # Métricas de hoy (última registro)
        today_metric = self.get_queryset().filter(date=today).order_by('-timestamp').first()
        
        if not today_metric:
            return Response({
                'message': 'No hay métricas para hoy',
                'date': today
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Métricas de ayer (última registro)
        yesterday_metric = self.get_queryset().filter(date=yesterday).order_by('-timestamp').first()
        
        # Calcular cambios
        data = {
            'date': today_metric.date,
            'heart_rate': today_metric.heart_rate,
            'hrv': today_metric.hrv,
            'spo2': today_metric.spo2,
            'steps': today_metric.steps,
            'activity_level': today_metric.activity_level,
            'stress_level': today_metric.stress_level,
            'fatigue_level': today_metric.fatigue_level,
            'recovery_score': today_metric.recovery_score,
            'heart_rate_change': None,
            'stress_change': None,
            'hrv_change': None,
            'activity_change': None,
        }
        
        if yesterday_metric:
            if today_metric.heart_rate and yesterday_metric.heart_rate:
                data['heart_rate_change'] = today_metric.heart_rate - yesterday_metric.heart_rate
            if today_metric.stress_level is not None and yesterday_metric.stress_level is not None:
                data['stress_change'] = today_metric.stress_level - yesterday_metric.stress_level
            if today_metric.hrv and yesterday_metric.hrv:
                data['hrv_change'] = today_metric.hrv - yesterday_metric.hrv
            if today_metric.activity_level is not None and yesterday_metric.activity_level is not None:
                data['activity_change'] = today_metric.activity_level - yesterday_metric.activity_level
        
        serializer = MetricSummarySerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trends(self, request):
        """
        Obtiene tendencias de métricas por período.
        
        GET /api/v1/metrics/trends/?period=week
        Parámetros: period (day/week/month)
        """
        period = request.query_params.get('period', 'week')
        today = timezone.now().date()
        
        if period == 'day':
            days = 1
        elif period == 'month':
            days = 30
        else:  # week
            days = 7
        
        start_date = today - timedelta(days=days)
        
        # Obtener métricas del período (un registro por día, el más reciente)
        metrics = []
        for i in range(days + 1):
            date = start_date + timedelta(days=i)
            metric = self.get_queryset().filter(date=date).order_by('-timestamp').first()
            metrics.append(metric)
        
        data = {
            'period': period,
            'dates': [(start_date + timedelta(days=i)) for i in range(days + 1)],
            'heart_rate': [m.heart_rate if m else None for m in metrics],
            'stress_level': [m.stress_level if m else None for m in metrics],
            'steps': [m.steps if m else 0 for m in metrics],
            'recovery_score': [m.recovery_score if m else None for m in metrics],
        }
        
        serializer = TrendsSerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recovery_analysis(self, request):
        """
        Análisis de recuperación (HRV, Estrés, Recuperación).
        
        GET /api/v1/metrics/recovery_analysis/
        """
        today = timezone.now().date()
        today_metric = self.get_queryset().filter(date=today).order_by('-timestamp').first()
        
        if not today_metric:
            return Response({
                'message': 'No hay métricas para análisis de recuperación'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Promedios de los últimos 7 días
        week_ago = today - timedelta(days=7)
        week_avg = self.get_queryset().filter(date__gte=week_ago).aggregate(
            avg_hrv=Avg('hrv'),
            avg_stress=Avg('stress_level'),
            avg_recovery=Avg('recovery_score')
        )
        
        return Response({
            'date': today,
            'hrv': today_metric.hrv,
            'hrv_status': 'Normal' if today_metric.hrv and today_metric.hrv > 30 else 'Bajo',
            'stress': today_metric.stress_level,
            'stress_status': 'Alto' if today_metric.stress_level and today_metric.stress_level > 70 else 'Normal',
            'recovery': today_metric.recovery_score,
            'recovery_status': 'Buena' if today_metric.recovery_score and today_metric.recovery_score > 70 else 'Necesaria',
            'week_averages': {
                'hrv': round(week_avg['avg_hrv']) if week_avg['avg_hrv'] else None,
                'stress': round(week_avg['avg_stress']) if week_avg['avg_stress'] else None,
                'recovery': round(week_avg['avg_recovery']) if week_avg['avg_recovery'] else None,
            }
        })
