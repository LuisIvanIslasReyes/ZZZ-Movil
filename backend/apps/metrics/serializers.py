from rest_framework import serializers
from .models import Metric


class MetricSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Metric.
    """
    wearable_serial = serializers.CharField(source='wearable.serial_number', read_only=True, allow_null=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    
    class Meta:
        model = Metric
        fields = [
            'id',
            'user',
            'user_name',
            'wearable',
            'wearable_serial',
            'date',
            'timestamp',
            'heart_rate',
            'hrv',
            'spo2',
            'steps',
            'activity_level',
            'movement',
            'stress_level',
            'fatigue_level',
            'recovery_score',
            'work_session',
            'task',
        ]
        read_only_fields = ['id', 'timestamp']


class MetricSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de métricas (HomeScreen).
    """
    date = serializers.DateField()
    heart_rate = serializers.IntegerField(allow_null=True)
    hrv = serializers.IntegerField(allow_null=True)
    spo2 = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    steps = serializers.IntegerField()
    activity_level = serializers.IntegerField(allow_null=True)
    stress_level = serializers.IntegerField(allow_null=True)
    fatigue_level = serializers.IntegerField(allow_null=True)
    recovery_score = serializers.IntegerField(allow_null=True)
    
    # Comparación vs anterior
    heart_rate_change = serializers.IntegerField(allow_null=True)
    stress_change = serializers.IntegerField(allow_null=True)
    hrv_change = serializers.IntegerField(allow_null=True)
    activity_change = serializers.IntegerField(allow_null=True)


class TrendsSerializer(serializers.Serializer):
    """
    Serializer para tendencias de métricas.
    """
    period = serializers.CharField()
    dates = serializers.ListField(child=serializers.DateField())
    heart_rate = serializers.ListField(child=serializers.IntegerField(allow_null=True))
    stress_level = serializers.ListField(child=serializers.IntegerField(allow_null=True))
    steps = serializers.ListField(child=serializers.IntegerField())
    recovery_score = serializers.ListField(child=serializers.IntegerField(allow_null=True))
