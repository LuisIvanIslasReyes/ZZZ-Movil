from django.contrib import admin
from .models import Metric


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'heart_rate', 'stress_level', 'steps', 'recovery_score', 'timestamp']
    list_filter = ['date', 'user']
    search_fields = ['user__username', 'user__email']
    date_hierarchy = 'date'
    readonly_fields = ['timestamp']
