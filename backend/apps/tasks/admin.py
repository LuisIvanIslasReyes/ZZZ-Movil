from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = [
        'task_name', 
        'user', 
        'priority', 
        'fatigue_risk_level', 
        'is_completed', 
        'start_time',
        'actual_duration'
    ]
    list_filter = ['priority', 'fatigue_risk_level', 'is_completed', 'start_time']
    search_fields = ['task_name', 'user__username', 'description']
    date_hierarchy = 'start_time'
    readonly_fields = ['created_at', 'completed_at', 'actual_duration']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('work_session', 'user', 'task_name', 'description')
        }),
        ('Prioridad y Riesgo', {
            'fields': ('priority', 'fatigue_risk_level')
        }),
        ('Tiempo', {
            'fields': ('start_time', 'end_time', 'estimated_duration', 'actual_duration')
        }),
        ('Estado', {
            'fields': ('is_completed', 'completed_at', 'notes')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
