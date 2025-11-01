from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Avg, Sum, Q
from .models import WorkSession, ShiftInterval
from .serializers import (
    WorkSessionSerializer,
    ShiftIntervalSerializer,
    WorkSessionSummarySerializer
)


class WorkSessionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de sesiones de trabajo.
    """
    serializer_class = WorkSessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar sesiones del usuario autenticado."""
        # Swagger fake view bypass
        if getattr(self, 'swagger_fake_view', False):
            return WorkSession.objects.none()
        
        queryset = WorkSession.objects.filter(user=self.request.user).select_related('department')
        
        # Filtros opcionales
        is_active = self.request.query_params.get('is_active')
        shift = self.request.query_params.get('shift')
        
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        if shift:
            queryset = queryset.filter(shift=shift)
        
        return queryset
    
    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear una sesión."""
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """
        Obtiene la sesión de trabajo activa actual.
        
        GET /api/v1/work-sessions/current/
        """
        session = self.get_queryset().filter(is_active=True).first()
        
        if session:
            serializer = self.get_serializer(session)
            return Response(serializer.data)
        
        return Response({
            'message': 'No hay sesión activa actualmente.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['post'])
    def end_session(self, request, pk=None):
        """
        Finaliza una sesión de trabajo.
        
        POST /api/v1/work-sessions/{id}/end_session/
        """
        session = self.get_object()
        
        if not session.is_active:
            return Response({
                'message': 'La sesión ya está finalizada.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        session.end_session()
        serializer = self.get_serializer(session)
        
        return Response({
            'message': 'Sesión finalizada exitosamente.',
            'session': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen de sesiones de trabajo del usuario.
        
        GET /api/v1/work-sessions/summary/
        """
        queryset = self.get_queryset()
        
        total_sessions = queryset.count()
        active_sessions = queryset.filter(is_active=True).count()
        
        # Calcular horas totales
        completed = queryset.filter(is_active=False, end_time__isnull=False)
        total_hours = 0
        for session in completed:
            if session.duration:
                total_hours += session.duration
        
        # Promedio de duración
        average_duration = total_hours / completed.count() if completed.count() > 0 else 0
        
        # Contar por turno
        by_shift = {}
        for shift, _ in WorkSession.SHIFT_CHOICES:
            count = queryset.filter(shift=shift).count()
            if count > 0:
                by_shift[shift] = count
        
        data = {
            'total_sessions': total_sessions,
            'active_sessions': active_sessions,
            'total_hours': round(total_hours, 2),
            'average_duration': round(average_duration, 2),
            'by_shift': by_shift,
        }
        
        serializer = WorkSessionSummarySerializer(data)
        return Response(serializer.data)


class ShiftIntervalViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de intervalos de descanso.
    """
    serializer_class = ShiftIntervalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar intervalos de sesiones del usuario autenticado."""
        # Swagger fake view bypass
        if getattr(self, 'swagger_fake_view', False):
            return ShiftInterval.objects.none()
        
        return ShiftInterval.objects.filter(
            work_session__user=self.request.user
        ).select_related('work_session')
