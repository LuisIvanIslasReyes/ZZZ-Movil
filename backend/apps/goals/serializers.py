from rest_framework import serializers
from .models import Goal


class GoalSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Goal.
    """
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    progress_percentage = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        read_only=True
    )
    
    class Meta:
        model = Goal
        fields = [
            'id',
            'user',
            'title',
            'category',
            'category_display',
            'target',
            'current_progress',
            'unit',
            'start_date',
            'end_date',
            'is_completed',
            'completed_at',
            'progress_percentage',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'is_completed', 'completed_at', 'created_at', 'updated_at']


class GoalProgressSerializer(serializers.Serializer):
    """
    Serializer para actualizar progreso de una meta.
    """
    current_progress = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )


class GoalSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de metas.
    """
    total = serializers.IntegerField()
    active = serializers.IntegerField()
    completed = serializers.IntegerField()
    overall_progress = serializers.DecimalField(max_digits=5, decimal_places=2)
    by_category = serializers.DictField()
