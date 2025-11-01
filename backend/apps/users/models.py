from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Usuario del sistema ZZZ.
    Extiende el modelo base de Django para incluir información específica.
    """
    ROLE_CHOICES = [
        ('employee', 'Empleado'),
        ('supervisor', 'Supervisor'),
        ('admin', 'Administrador'),
    ]
    
    # Información básica extendida
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        verbose_name='ID de Empleado',
        help_text='Identificador único del empleado'
    )
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='employee',
        verbose_name='Rol',
        db_index=True
    )
    
    # Información laboral
    department = models.ForeignKey(
        'departments.Department',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users',
        verbose_name='Departamento'
    )
    
    location = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name='Ubicación'
    )
    
    hire_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Fecha de Ingreso'
    )
    
    # Configuración de notificaciones
    notifications_enabled = models.BooleanField(
        default=True,
        verbose_name='Notificaciones Habilitadas'
    )
    
    fatigue_alerts_enabled = models.BooleanField(
        default=True,
        verbose_name='Alertas de Fatiga Habilitadas'
    )
    
    ai_recommendations_enabled = models.BooleanField(
        default=True,
        verbose_name='Recomendaciones IA Habilitadas'
    )
    
    sync_enabled = models.BooleanField(
        default=True,
        verbose_name='Sincronización Habilitada'
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última Actualización')
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['employee_id']),
            models.Index(fields=['role']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.employee_id or 'Sin ID'})"
    
    @property
    def full_name(self):
        """Retorna el nombre completo del usuario."""
        return self.get_full_name() or self.username
