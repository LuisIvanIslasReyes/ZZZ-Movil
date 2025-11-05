from rest_framework import serializers
from .models import Metric, MetricType


class MetricTypeSerializer(serializers.ModelSerializer):
    """
    Serializer para el catálogo de tipos de métricas.
    """
    class Meta:
        model = MetricType
        fields = [
            'code',
            'name',
            'unit',
            'description',
            'min_value',
            'max_value',
            'is_active',
        ]
        read_only_fields = ['code']


class MetricSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Metric con estructura normalizada.
    """
    metric_type_name = serializers.CharField(source='metric_type.name', read_only=True)
    metric_type_unit = serializers.CharField(source='metric_type.unit', read_only=True)
    wearable_serial = serializers.CharField(source='wearable.serial_number', read_only=True, allow_null=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Metric
        fields = [
            'id',
            'user',
            'user_name',
            'metric_type',
            'metric_type_name',
            'metric_type_unit',
            'wearable',
            'wearable_serial',
            'work_session',
            'value',
            'stress_category',
            'timestamp',
        ]
        read_only_fields = ['id', 'timestamp', 'stress_category']
    
    def validate(self, data):
        """
        Validaciones según el tipo de métrica.
        """
        metric_type = data.get('metric_type')
        value = data.get('value')
        
        if metric_type and value is not None:
            # Validar rangos según min/max del tipo
            if metric_type.min_value is not None and value < metric_type.min_value:
                raise serializers.ValidationError(
                    f"{metric_type.name} no puede ser menor a {metric_type.min_value}"
                )
            
            if metric_type.max_value is not None and value > metric_type.max_value:
                raise serializers.ValidationError(
                    f"{metric_type.name} no puede ser mayor a {metric_type.max_value}"
                )
        
        return data


class MetricCreateSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para crear métricas desde el frontend.
    """
    class Meta:
        model = Metric
        fields = ['metric_type', 'value', 'wearable', 'work_session']
    
    def create(self, validated_data):
        # Asignar usuario del contexto
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class MetricSummarySerializer(serializers.Serializer):
    """
    Serializer para resumen de métricas agrupadas por tipo.
    """
    metric_type = serializers.CharField()
    metric_name = serializers.CharField()
    current_value = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    unit = serializers.CharField()
    stress_category = serializers.CharField(allow_null=True)
    change_percentage = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    timestamp = serializers.DateTimeField()


class TrendsSerializer(serializers.Serializer):
    """
    Serializer para tendencias de métricas por tipo.
    """
    metric_type = serializers.CharField()
    metric_name = serializers.CharField()
    unit = serializers.CharField()
    period = serializers.CharField()
    dates = serializers.ListField(child=serializers.DateField())
    values = serializers.ListField(child=serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True))
    average = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)

