from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Alert.
    """
    alert_type_display = serializers.CharField(source='get_alert_type_display', read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    
    class Meta:
        model = Alert
        fields = [
            'id',
            'user',
            'metric',
            'alert_type',
            'alert_type_display',
            'level',
            'level_display',
            'title',
            'message',
            'is_read',
            'created_at',
            'read_at',
        ]
        read_only_fields = ['id', 'created_at', 'read_at']


class AlertSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de alertas del día.
    """
    date = serializers.DateField()
    total = serializers.IntegerField()
    unread = serializers.IntegerField()
    critical = serializers.IntegerField()
    high = serializers.IntegerField()
    medium = serializers.IntegerField()
    low = serializers.IntegerField()
    by_type = serializers.DictField()
