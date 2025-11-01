from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Avg, Q
from .models import Goal
from .serializers import GoalSerializer, GoalProgressSerializer, GoalSummarySerializer


class GoalViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de metas.
    """
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar metas del usuario autenticado."""
        queryset = Goal.objects.filter(user=self.request.user)
        
        # Filtros opcionales
        category = self.request.query_params.get('category')
        is_completed = self.request.query_params.get('is_completed')
        
        if category:
            queryset = queryset.filter(category=category)
        if is_completed is not None:
            queryset = queryset.filter(is_completed=is_completed.lower() == 'true')
        
        return queryset
    
    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear una meta."""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        """
        Actualiza el progreso de una meta.
        
        POST /api/v1/goals/{id}/update_progress/
        Body: {"current_progress": 5000}
        """
        goal = self.get_object()
        serializer = GoalProgressSerializer(data=request.data)
        
        if serializer.is_valid():
            new_progress = serializer.validated_data['current_progress']
            goal.update_progress(new_progress)
            
            return Response({
                'message': 'Progreso actualizado exitosamente.',
                'goal': GoalSerializer(goal).data
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Resumen general de metas del usuario.
        
        GET /api/v1/goals/summary/
        """
        queryset = self.get_queryset()
        
        total = queryset.count()
        active = queryset.filter(is_completed=False).count()
        completed = queryset.filter(is_completed=True).count()
        
        # Calcular progreso promedio
        avg_progress = queryset.aggregate(
            avg=Avg('current_progress')
        )['avg'] or 0
        
        # Contar por categoría
        by_category = {}
        for category, _ in Goal.CATEGORY_CHOICES:
            count = queryset.filter(category=category).count()
            if count > 0:
                by_category[category] = count
        
        data = {
            'total': total,
            'active': active,
            'completed': completed,
            'overall_progress': avg_progress,
            'by_category': by_category,
        }
        
        serializer = GoalSummarySerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recommendations(self, request):
        """
        Recomendaciones personalizadas basadas en metas actuales.
        
        GET /api/v1/goals/recommendations/
        """
        queryset = self.get_queryset().filter(is_completed=False)
        
        recommendations = []
        
        # Analizar metas activas
        for goal in queryset:
            progress = goal.progress_percentage
            
            if progress < 25:
                recommendations.append({
                    'goal_id': goal.id,
                    'title': goal.title,
                    'message': f'Estás al {progress:.0f}% de tu meta. ¡Puedes lograrlo! Establece recordatorios diarios.',
                    'priority': 'high'
                })
            elif progress < 75:
                recommendations.append({
                    'goal_id': goal.id,
                    'title': goal.title,
                    'message': f'Vas por buen camino con {progress:.0f}% completado. Mantén el ritmo.',
                    'priority': 'medium'
                })
            else:
                recommendations.append({
                    'goal_id': goal.id,
                    'title': goal.title,
                    'message': f'¡Casi lo logras! Estás al {progress:.0f}%. Un último esfuerzo.',
                    'priority': 'low'
                })
        
        return Response({
            'date': timezone.now().date(),
            'recommendations': recommendations[:5]  # Limitar a 5 recomendaciones
        })
