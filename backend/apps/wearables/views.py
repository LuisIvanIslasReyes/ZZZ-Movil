from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Count, Q
from .models import Wearable, WearableAssignment
from .serializers import (
    WearableSerializer,
    WearableAssignmentSerializer,
    WearableSummarySerializer
)


class WearableViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de wearables.
    """
    serializer_class = WearableSerializer
    permission_classes = [IsAuthenticated]
    queryset = Wearable.objects.all()
    
    def get_queryset(self):
        """Filtrar wearables."""
        queryset = Wearable.objects.all()
        
        # Filtros opcionales
        status_filter = self.request.query_params.get('status')
        model = self.request.query_params.get('model')
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if model:
            queryset = queryset.filter(model__icontains=model)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        """
        Obtiene wearables disponibles (no asignados).
        
        GET /api/v1/wearables/available/
        """
        # Wearables activos sin asignación activa
        assigned_ids = WearableAssignment.objects.filter(
            is_active=True
        ).values_list('wearable_id', flat=True)
        
        available = self.get_queryset().filter(
            status='active'
        ).exclude(id__in=assigned_ids)
        
        serializer = self.get_serializer(available, many=True)
        return Response({
            'count': available.count(),
            'wearables': serializer.data
        })
    
    @action(detail=True, methods=['post'])
    def sync(self, request, pk=None):
        """
        Actualiza la última sincronización del wearable.
        
        POST /api/v1/wearables/{id}/sync/
        Body: {"battery_level": 85}
        """
        wearable = self.get_object()
        
        battery_level = request.data.get('battery_level')
        if battery_level is not None:
            wearable.battery_level = battery_level
        
        wearable.last_sync = timezone.now()
        wearable.save()
        
        serializer = self.get_serializer(wearable)
        return Response({
            'message': 'Sincronización exitosa.',
            'wearable': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen de wearables.
        
        GET /api/v1/wearables/summary/
        """
        queryset = self.get_queryset()
        
        total = queryset.count()
        active = queryset.filter(status='active').count()
        maintenance = queryset.filter(status='maintenance').count()
        
        # Contar asignados
        assigned = WearableAssignment.objects.filter(is_active=True).count()
        available = active - assigned
        
        # Contar por modelo
        by_model = {}
        models = queryset.values('model').annotate(count=Count('id'))
        for item in models:
            by_model[item['model']] = item['count']
        
        data = {
            'total': total,
            'active': active,
            'assigned': assigned,
            'available': max(available, 0),
            'maintenance': maintenance,
            'by_model': by_model,
        }
        
        serializer = WearableSummarySerializer(data)
        return Response(serializer.data)


class WearableAssignmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de asignaciones de wearables.
    """
    serializer_class = WearableAssignmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar asignaciones del usuario autenticado."""
        # Swagger fake view bypass
        if getattr(self, 'swagger_fake_view', False):
            return WearableAssignment.objects.none()
        
        queryset = WearableAssignment.objects.all().select_related('wearable', 'user')
        
        # Filtros opcionales
        is_active = self.request.query_params.get('is_active')
        user_id = self.request.query_params.get('user')
        
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def my_wearable(self, request):
        """
        Obtiene el wearable asignado al usuario autenticado.
        
        GET /api/v1/wearable-assignments/my_wearable/
        """
        assignment = self.get_queryset().filter(
            user=request.user,
            is_active=True
        ).first()
        
        if assignment:
            serializer = self.get_serializer(assignment)
            return Response(serializer.data)
        
        return Response({
            'message': 'No tienes wearable asignado actualmente.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['post'])
    def return_device(self, request, pk=None):
        """
        Marca un wearable como devuelto.
        
        POST /api/v1/wearable-assignments/{id}/return_device/
        """
        assignment = self.get_object()
        
        if not assignment.is_active:
            return Response({
                'message': 'Esta asignación ya está finalizada.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        assignment.return_wearable()
        serializer = self.get_serializer(assignment)
        
        return Response({
            'message': 'Wearable devuelto exitosamente.',
            'assignment': serializer.data
        })
