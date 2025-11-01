from django.contrib import admin
from .models import Wearable, WearableAssignment


@admin.register(Wearable)
class WearableAdmin(admin.ModelAdmin):
    list_display = [
        'serial_number', 
        'model', 
        'manufacturer', 
        'status', 
        'battery_level', 
        'last_sync'
    ]
    list_filter = ['status', 'manufacturer', 'created_at']
    search_fields = ['serial_number', 'model']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('serial_number', 'model', 'manufacturer', 'status')
        }),
        ('Detalles Técnicos', {
            'fields': ('firmware_version', 'battery_level', 'last_sync')
        }),
        ('Información Adicional', {
            'fields': ('purchase_date', 'notes')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(WearableAssignment)
class WearableAssignmentAdmin(admin.ModelAdmin):
    list_display = [
        'wearable', 
        'user', 
        'assigned_date', 
        'returned_date', 
        'is_active'
    ]
    list_filter = ['is_active', 'assigned_date']
    search_fields = ['wearable__serial_number', 'user__username']
    readonly_fields = ['assigned_date', 'returned_date']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('wearable', 'user')
