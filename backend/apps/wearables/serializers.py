from rest_framework import serializers
from .models import Wearable, WearableAssignment


class WearableSerializer(serializers.ModelSerializer):
    """
    Serializer para Wearable.
    """
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Wearable
        fields = [
            'id',
            'serial_number',
            'model',
            'manufacturer',
            'status',
            'status_display',
            'firmware_version',
            'battery_level',
            'last_sync',
            'purchase_date',
            'notes',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class WearableAssignmentSerializer(serializers.ModelSerializer):
    """
    Serializer para WearableAssignment.
    """
    wearable_serial = serializers.CharField(source='wearable.serial_number', read_only=True)
    wearable_model = serializers.CharField(source='wearable.model', read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = WearableAssignment
        fields = [
            'id',
            'wearable',
            'wearable_serial',
            'wearable_model',
            'user',
            'user_name',
            'assigned_date',
            'returned_date',
            'is_active',
            'notes',
        ]
        read_only_fields = ['id', 'assigned_date', 'returned_date']


class WearableSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de wearables.
    """
    total = serializers.IntegerField()
    active = serializers.IntegerField()
    assigned = serializers.IntegerField()
    available = serializers.IntegerField()
    maintenance = serializers.IntegerField()
    by_model = serializers.DictField()
