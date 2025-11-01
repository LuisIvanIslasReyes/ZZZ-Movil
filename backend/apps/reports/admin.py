from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = [
        'title', 
        'report_type', 
        'generated_by', 
        'department', 
        'start_date', 
        'end_date', 
        'created_at'
    ]
    list_filter = ['report_type', 'created_at', 'start_date']
    search_fields = ['title', 'generated_by__username', 'department__name']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('report_type', 'title', 'generated_by', 'department')
        }),
        ('Período', {
            'fields': ('start_date', 'end_date')
        }),
        ('Contenido', {
            'fields': ('parameters', 'content', 'summary')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
