from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Avg, Count, Q
from datetime import datetime, timedelta
from .models import Report
from .serializers import ReportSerializer, ReportGenerateSerializer
from apps.metrics.models import Metric
from apps.alerts.models import Alert
from apps.goals.models import Goal
from apps.work_sessions.models import WorkSession


class ReportViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de reportes.
    """
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar reportes según permisos del usuario."""
        user = self.request.user
        
        if user.role == 'admin':
            # Admins ven todos los reportes
            return Report.objects.all().select_related('generated_by', 'department')
        elif user.role == 'supervisor':
            # Supervisores ven reportes de su departamento
            return Report.objects.filter(
                Q(generated_by=user) | Q(department=user.department)
            ).select_related('generated_by', 'department')
        else:
            # Empleados solo ven sus propios reportes
            return Report.objects.filter(
                generated_by=user
            ).select_related('generated_by', 'department')
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """
        Genera un nuevo reporte basado en parámetros.
        
        POST /api/v1/reports/generate/
        Body: {
            "report_type": "individual",
            "start_date": "2024-10-01",
            "end_date": "2024-10-31",
            "user_id": 1
        }
        """
        serializer = ReportGenerateSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        report_type = data['report_type']
        start_date = data['start_date']
        end_date = data['end_date']
        
        # Generar contenido según tipo de reporte
        if report_type == 'individual':
            user_id = data.get('user_id', request.user.id)
            content = self._generate_individual_report(user_id, start_date, end_date)
            title = f"Reporte Individual - {content.get('user_name', 'Usuario')}"
        
        elif report_type == 'department':
            department_id = data.get('department_id')
            content = self._generate_department_report(department_id, start_date, end_date)
            title = f"Reporte de Departamento - {content.get('department_name', 'N/A')}"
        
        elif report_type == 'fatigue':
            user_id = data.get('user_id', request.user.id)
            content = self._generate_fatigue_report(user_id, start_date, end_date)
            title = f"Análisis de Fatiga - {content.get('user_name', 'Usuario')}"
        
        else:
            content = {'message': 'Tipo de reporte no implementado'}
            title = 'Reporte'
        
        # Crear reporte
        report = Report.objects.create(
            report_type=report_type,
            generated_by=request.user,
            department_id=data.get('department_id'),
            title=title,
            start_date=start_date,
            end_date=end_date,
            parameters=data,
            content=content,
            summary=content.get('summary', '')
        )
        
        return Response({
            'message': 'Reporte generado exitosamente.',
            'report': ReportSerializer(report).data
        }, status=status.HTTP_201_CREATED)
    
    def _generate_individual_report(self, user_id, start_date, end_date):
        """Genera reporte individual de métricas."""
        from apps.users.models import User
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return {'error': 'Usuario no encontrado'}
        
        # Obtener métricas del período
        metrics = Metric.objects.filter(
            user_id=user_id,
            date__gte=start_date,
            date__lte=end_date
        )
        
        if not metrics.exists():
            return {
                'user_name': user.get_full_name(),
                'summary': 'No hay datos disponibles para el período seleccionado.',
                'metrics_count': 0
            }
        
        # Calcular promedios
        avg_data = metrics.aggregate(
            avg_heart_rate=Avg('heart_rate'),
            avg_stress=Avg('stress_level'),
            avg_fatigue=Avg('fatigue_level'),
            avg_recovery=Avg('recovery_score'),
            avg_hrv=Avg('hrv'),
            total_steps=Avg('steps')
        )
        
        # Contar alertas
        alerts_count = Alert.objects.filter(
            user_id=user_id,
            created_at__date__gte=start_date,
            created_at__date__lte=end_date
        ).count()
        
        # Metas completadas
        goals_completed = Goal.objects.filter(
            user_id=user_id,
            is_completed=True,
            completed_at__date__gte=start_date,
            completed_at__date__lte=end_date
        ).count()
        
        return {
            'user_name': user.get_full_name(),
            'user_employee_id': user.employee_id,
            'period': f"{start_date} a {end_date}",
            'metrics_count': metrics.count(),
            'averages': {
                'heart_rate': round(avg_data['avg_heart_rate'] or 0, 1),
                'stress_level': round(avg_data['avg_stress'] or 0, 1),
                'fatigue_level': round(avg_data['avg_fatigue'] or 0, 1),
                'recovery_score': round(avg_data['avg_recovery'] or 0, 1),
                'hrv': round(avg_data['avg_hrv'] or 0, 1),
                'steps': round(avg_data['total_steps'] or 0, 0),
            },
            'alerts_count': alerts_count,
            'goals_completed': goals_completed,
            'summary': f'Reporte del {start_date} al {end_date}. {metrics.count()} registros de métricas, {alerts_count} alertas y {goals_completed} metas completadas.'
        }
    
    def _generate_department_report(self, department_id, start_date, end_date):
        """Genera reporte departamental."""
        from apps.departments.models import Department
        
        try:
            department = Department.objects.get(id=department_id)
        except Department.DoesNotExist:
            return {'error': 'Departamento no encontrado'}
        
        users = department.users.all()
        user_ids = users.values_list('id', flat=True)
        
        # Métricas del departamento
        metrics = Metric.objects.filter(
            user_id__in=user_ids,
            date__gte=start_date,
            date__lte=end_date
        )
        
        avg_data = metrics.aggregate(
            avg_stress=Avg('stress_level'),
            avg_fatigue=Avg('fatigue_level'),
            avg_recovery=Avg('recovery_score')
        )
        
        # Alertas del departamento
        alerts_count = Alert.objects.filter(
            user_id__in=user_ids,
            created_at__date__gte=start_date,
            created_at__date__lte=end_date
        ).count()
        
        return {
            'department_name': department.name,
            'total_employees': users.count(),
            'period': f"{start_date} a {end_date}",
            'metrics_count': metrics.count(),
            'averages': {
                'stress_level': round(avg_data['avg_stress'] or 0, 1),
                'fatigue_level': round(avg_data['avg_fatigue'] or 0, 1),
                'recovery_score': round(avg_data['avg_recovery'] or 0, 1),
            },
            'alerts_count': alerts_count,
            'summary': f'Reporte departamental del {start_date} al {end_date}. {users.count()} empleados, {metrics.count()} registros de métricas.'
        }
    
    def _generate_fatigue_report(self, user_id, start_date, end_date):
        """Genera reporte específico de análisis de fatiga."""
        from apps.users.models import User
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return {'error': 'Usuario no encontrado'}
        
        metrics = Metric.objects.filter(
            user_id=user_id,
            date__gte=start_date,
            date__lte=end_date
        ).order_by('date')
        
        if not metrics.exists():
            return {
                'user_name': user.get_full_name(),
                'summary': 'No hay datos de fatiga disponibles.',
                'risk_level': 'unknown'
            }
        
        # Análisis de fatiga
        high_fatigue_days = metrics.filter(fatigue_level__gte=7).count()
        avg_fatigue = metrics.aggregate(avg=Avg('fatigue_level'))['avg'] or 0
        
        risk_level = 'low'
        if avg_fatigue >= 7:
            risk_level = 'high'
        elif avg_fatigue >= 5:
            risk_level = 'medium'
        
        return {
            'user_name': user.get_full_name(),
            'period': f"{start_date} a {end_date}",
            'total_days': metrics.count(),
            'high_fatigue_days': high_fatigue_days,
            'average_fatigue': round(avg_fatigue, 2),
            'risk_level': risk_level,
            'summary': f'Análisis de fatiga: {high_fatigue_days} días con fatiga alta de {metrics.count()} días registrados. Nivel de riesgo: {risk_level}.'
        }
