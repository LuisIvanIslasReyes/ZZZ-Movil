from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Task.
    """
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    risk_level_display = serializers.CharField(source='get_fatigue_risk_level_display', read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id',
            'work_session',
            'user',
            'user_name',
            'task_name',
            'description',
            'priority',
            'priority_display',
            'fatigue_risk_level',
            'risk_level_display',
            'start_time',
            'end_time',
            'estimated_duration',
            'actual_duration',
            'is_completed',
            'completed_at',
            'notes',
            'created_at',
        ]
        read_only_fields = ['id', 'actual_duration', 'completed_at', 'created_at']


class TaskSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de tareas.
    """
    total = serializers.IntegerField()
    completed = serializers.IntegerField()
    pending = serializers.IntegerField()
    high_risk = serializers.IntegerField()
    average_duration = serializers.DecimalField(max_digits=10, decimal_places=2)
    by_priority = serializers.DictField()
