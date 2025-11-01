from django.db import models
from django.conf import settings


class Department(models.Model):
    """
    Departamento de la organización.
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='Nombre del Departamento'
    )
    
    description = models.TextField(
        blank=True,
        verbose_name='Descripción'
    )
    
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='supervised_departments',
        verbose_name='Supervisor',
        limit_choices_to={'role': 'supervisor'}
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última Actualización')
    
    class Meta:
        verbose_name = 'Departamento'
        verbose_name_plural = 'Departamentos'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    @property
    def total_employees(self):
        """Retorna el total de empleados del departamento."""
        return self.users.filter(is_active=True).count()
