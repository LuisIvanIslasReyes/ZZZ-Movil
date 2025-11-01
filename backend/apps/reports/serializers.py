from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    """
    Serializer para Report.
    """
    report_type_display = serializers.CharField(source='get_report_type_display', read_only=True)
    generated_by_name = serializers.CharField(source='generated_by.get_full_name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Report
        fields = [
            'id',
            'report_type',
            'report_type_display',
            'generated_by',
            'generated_by_name',
            'department',
            'department_name',
            'title',
            'start_date',
            'end_date',
            'parameters',
            'content',
            'summary',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class ReportGenerateSerializer(serializers.Serializer):
    """
    Serializer para generar un nuevo reporte.
    """
    report_type = serializers.ChoiceField(choices=Report.REPORT_TYPES)
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    department_id = serializers.IntegerField(required=False, allow_null=True)
    user_id = serializers.IntegerField(required=False, allow_null=True)
