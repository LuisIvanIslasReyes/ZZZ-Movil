from rest_framework import serializers
from .models import Goal
from django.utils import timezone
from datetime import timedelta


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
        read_only_fields = ['id', 'user', 'is_completed', 'completed_at', 'created_at', 'updated_at']


class GoalCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear metas (sin requerir user en el body).
    """
    start_date = serializers.DateField(required=False, allow_null=True)
    end_date = serializers.DateField(required=False, allow_null=True)
    
    class Meta:
        model = Goal
        fields = [
            'title',
            'category',
            'target',
            'unit',
            'start_date',
            'end_date',
        ]
    
    def validate(self, data):
        """Validaciones personalizadas."""
        # Si no se proporciona start_date, usar hoy
        if 'start_date' not in data or data['start_date'] is None:
            data['start_date'] = timezone.now().date()
        
        # Si no se proporciona end_date, establecer 30 días después
        if 'end_date' not in data or data['end_date'] is None:
            data['end_date'] = data['start_date'] + timedelta(days=30)
        
        # Validar que end_date sea posterior a start_date
        if data['end_date'] <= data['start_date']:
            raise serializers.ValidationError({
                'end_date': 'La fecha de finalización debe ser posterior a la fecha de inicio.'
            })
        
        return data


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
