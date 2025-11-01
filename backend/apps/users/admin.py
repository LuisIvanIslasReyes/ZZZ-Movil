from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Employee


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Configuración del admin para el modelo User (solo autenticación).
    """
    list_display = [
        'username',
        'email',
        'full_name',
        'role',
        'is_active',
        'is_staff',
        'date_joined'
    ]
    
    list_filter = [
        'role',
        'is_active',
        'is_staff',
        'notifications_enabled'
    ]
    
    search_fields = [
        'username',
        'email',
        'first_name',
        'last_name'
    ]
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Rol y Permisos', {
            'fields': ('role',)
        }),
        ('Configuración de Notificaciones', {
            'fields': (
                'notifications_enabled',
                'fatigue_alerts_enabled',
                'ai_recommendations_enabled',
                'sync_enabled',
                'fcm_token'
            )
        }),
    )


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    """
    Configuración del admin para el modelo Employee (información laboral).
    """
    list_display = [
        'employee_id',
        'full_name',
        'employee_number',
        'department',
        'location',
        'hire_date',
        'is_active',
        'get_username'
    ]
    
    list_filter = [
        'is_active',
        'department',
        'hire_date'
    ]
    
    search_fields = [
        'employee_id',
        'name',
        'last_name',
        'employee_number',
        'user__username',
        'user__email'
    ]
    
    fieldsets = (
        ('Información Personal', {
            'fields': ('employee_id', 'name', 'last_name', 'employee_number')
        }),
        ('Usuario Asociado', {
            'fields': ('user',)
        }),
        ('Información Laboral', {
            'fields': ('department', 'location', 'hire_date', 'is_active')
        }),
    )
    
    def get_username(self, obj):
        """Retorna el username del usuario asociado."""
        return obj.user.username
    get_username.short_description = 'Usuario'
    get_username.admin_order_field = 'user__username'
