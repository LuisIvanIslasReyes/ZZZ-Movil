from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Configuración del admin para el modelo User extendido.
    """
    list_display = [
        'username',
        'email',
        'employee_id',
        'full_name',
        'role',
        'department',
        'is_active',
        'date_joined'
    ]
    
    list_filter = [
        'role',
        'is_active',
        'is_staff',
        'department',
        'notifications_enabled'
    ]
    
    search_fields = [
        'username',
        'email',
        'employee_id',
        'first_name',
        'last_name'
    ]
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información Laboral', {
            'fields': ('employee_id', 'role', 'department', 'location', 'hire_date')
        }),
        ('Configuración de Notificaciones', {
            'fields': (
                'notifications_enabled',
                'fatigue_alerts_enabled',
                'ai_recommendations_enabled',
                'sync_enabled'
            )
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Información Adicional', {
            'fields': ('employee_id', 'role', 'department', 'location', 'hire_date')
        }),
    )
    
    ordering = ['-date_joined']
    date_hierarchy = 'date_joined'
