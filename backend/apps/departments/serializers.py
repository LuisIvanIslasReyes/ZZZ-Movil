from rest_framework import serializers
from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Department.
    """
    supervisor_name = serializers.CharField(source='supervisor.full_name', read_only=True, allow_null=True)
    total_employees = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'description',
            'supervisor',
            'supervisor_name',
            'total_employees',
            'is_active',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
