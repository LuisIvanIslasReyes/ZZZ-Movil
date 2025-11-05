from django.contrib import admin
from .models import Metric, MetricType


@admin.register(MetricType)
class MetricTypeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'unit', 'min_value', 'max_value', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name']
    readonly_fields = ['code']


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ['user', 'metric_type', 'value', 'stress_category', 'work_session', 'timestamp']
    list_filter = ['metric_type', 'stress_category', 'timestamp']
    search_fields = ['user__username', 'user__email']
    date_hierarchy = 'timestamp'
    readonly_fields = ['timestamp', 'stress_category']
    autocomplete_fields = ['user', 'wearable', 'work_session']

