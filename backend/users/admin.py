from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Configuración del admin para el modelo User extendido.
    """
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información Adicional', {
            'fields': ('employee_id', 'role', 'department', 'location', 'hire_date')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Información Adicional', {
            'fields': ('employee_id', 'role', 'department', 'location', 'hire_date')
        }),
    )
    
    list_display = ['username', 'email', 'employee_id', 'role', 'department', 'is_active']
    list_filter = ['role', 'department', 'is_active']
    search_fields = ['username', 'email', 'employee_id', 'first_name', 'last_name']
