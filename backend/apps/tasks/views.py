from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Avg, Count, Q
from .models import Task
from .serializers import TaskSerializer, TaskSummarySerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de tareas.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar tareas del usuario autenticado."""
        queryset = Task.objects.filter(user=self.request.user).select_related('work_session', 'user')
        
        # Filtros opcionales
        is_completed = self.request.query_params.get('is_completed')
        priority = self.request.query_params.get('priority')
        risk_level = self.request.query_params.get('risk_level')
        work_session_id = self.request.query_params.get('work_session')
        
        if is_completed is not None:
            queryset = queryset.filter(is_completed=is_completed.lower() == 'true')
        if priority:
            queryset = queryset.filter(priority=priority)
        if risk_level:
            queryset = queryset.filter(fatigue_risk_level=risk_level)
        if work_session_id:
            queryset = queryset.filter(work_session_id=work_session_id)
        
        return queryset
    
    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear una tarea."""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """
        Marca una tarea como completada.
        
        POST /api/v1/tasks/{id}/complete/
        """
        task = self.get_object()
        
        if task.is_completed:
            return Response({
                'message': 'La tarea ya está completada.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        task.complete_task()
        serializer = self.get_serializer(task)
        
        return Response({
            'message': 'Tarea completada exitosamente.',
            'task': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """
        Obtiene todas las tareas pendientes del usuario.
        
        GET /api/v1/tasks/pending/
        """
        tasks = self.get_queryset().filter(is_completed=False).order_by('priority', 'start_time')
        
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen de tareas del usuario.
        
        GET /api/v1/tasks/summary/
        """
        queryset = self.get_queryset()
        
        total = queryset.count()
        completed = queryset.filter(is_completed=True).count()
        pending = queryset.filter(is_completed=False).count()
        high_risk = queryset.filter(fatigue_risk_level='high').count()
        
        # Calcular duración promedio
        completed_tasks = queryset.filter(is_completed=True, actual_duration__isnull=False)
        avg_duration = completed_tasks.aggregate(
            avg=Avg('actual_duration')
        )['avg'] or 0
        
        # Contar por prioridad
        by_priority = {}
        for priority, _ in Task.PRIORITY_CHOICES:
            count = queryset.filter(priority=priority).count()
            if count > 0:
                by_priority[priority] = count
        
        data = {
            'total': total,
            'completed': completed,
            'pending': pending,
            'high_risk': high_risk,
            'average_duration': round(avg_duration, 2),
            'by_priority': by_priority,
        }
        
        serializer = TaskSummarySerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def high_risk(self, request):
        """
        Obtiene tareas con alto riesgo de fatiga.
        
        GET /api/v1/tasks/high_risk/
        """
        tasks = self.get_queryset().filter(
            fatigue_risk_level='high',
            is_completed=False
        ).order_by('-priority')
        
        serializer = self.get_serializer(tasks, many=True)
        
        return Response({
            'count': tasks.count(),
            'tasks': serializer.data
        })
