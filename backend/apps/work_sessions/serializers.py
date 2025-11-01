from rest_framework import serializers
from .models import WorkSession, ShiftInterval


class ShiftIntervalSerializer(serializers.ModelSerializer):
    """
    Serializer para ShiftInterval.
    """
    interval_type_display = serializers.CharField(source='get_interval_type_display', read_only=True)
    
    class Meta:
        model = ShiftInterval
        fields = [
            'id',
            'work_session',
            'interval_type',
            'interval_type_display',
            'start_time',
            'end_time',
            'duration_minutes',
        ]
        read_only_fields = ['id', 'duration_minutes']


class WorkSessionSerializer(serializers.ModelSerializer):
    """
    Serializer para WorkSession.
    """
    shift_display = serializers.CharField(source='get_shift_display', read_only=True)
    duration = serializers.DecimalField(max_digits=5, decimal_places=2, read_only=True)
    intervals = ShiftIntervalSerializer(many=True, read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = WorkSession
        fields = [
            'id',
            'user',
            'department',
            'department_name',
            'shift',
            'shift_display',
            'start_time',
            'end_time',
            'is_active',
            'duration',
            'notes',
            'intervals',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class WorkSessionSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de sesiones de trabajo.
    """
    total_sessions = serializers.IntegerField()
    active_sessions = serializers.IntegerField()
    total_hours = serializers.DecimalField(max_digits=10, decimal_places=2)
    average_duration = serializers.DecimalField(max_digits=5, decimal_places=2)
    by_shift = serializers.DictField()
