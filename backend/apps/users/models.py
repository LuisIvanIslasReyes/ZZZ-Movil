from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    """
    Usuario del sistema ZZZ - Solo para autenticación y control de acceso.
    Puede ser: admin, supervisor, o employee.
    """
    ROLE_CHOICES = [
        ('employee', 'Empleado'),
        ('supervisor', 'Supervisor'),
        ('admin', 'Administrador'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='employee',
        verbose_name='Rol',
        db_index=True
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
    
    # Firebase Cloud Messaging Token (para notificaciones push)
    fcm_token = models.TextField(
        blank=True,
        null=True,
        verbose_name='FCM Token',
        help_text='Token de Firebase Cloud Messaging para notificaciones push'
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última Actualización')
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['role']),
        ]
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def full_name(self):
        """Retorna el nombre completo del usuario."""
        return self.get_full_name() or self.username


class EmployeeManager(models.Manager):
    """Manager personalizado para Employee con generación automática de employee_id."""
    
    def generate_employee_id(self):
        """Genera un employee_id único en formato EMP-YYYY-NNNN."""
        year = datetime.now().year
        # Obtener el último ID del año
        last_employee = self.filter(employee_id__startswith=f'EMP-{year}-').order_by('employee_id').last()
        
        if last_employee:
            # Extraer el número secuencial
            last_num = int(last_employee.employee_id.split('-')[-1])
            new_num = last_num + 1
        else:
            new_num = 1
        
        return f'EMP-{year}-{new_num:04d}'


class Employee(models.Model):
    """
    Información detallada del empleado.
    Solo los usuarios con rol 'employee' tienen un registro aquí.
    """
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        primary_key=True,
        editable=False,
        verbose_name='ID de Empleado',
        help_text='Identificador único auto-generado del empleado'
    )
    
    # Manager personalizado
    objects = EmployeeManager()
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employee_profile',
        verbose_name='Usuario',
        help_text='Usuario asociado (debe tener rol employee)',
        limit_choices_to={'role': 'employee'}
    )
    
    name = models.CharField(
        max_length=100,
        verbose_name='Nombre(s)'
    )
    
    last_name = models.CharField(
        max_length=100,
        verbose_name='Apellidos'
    )
    
    employee_number = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True,
        verbose_name='Número de Empleado',
        help_text='Número de nómina o identificador adicional'
    )
    
    # Información laboral
    department = models.ForeignKey(
        'departments.Department',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees',
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
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última Actualización')
    
    class Meta:
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'
        ordering = ['last_name', 'name']
        indexes = [
            models.Index(fields=['employee_number']),
            models.Index(fields=['department']),
        ]
    
    def __str__(self):
        return f"{self.name} {self.last_name} ({self.employee_id})"
    
    @property
    def full_name(self):
        """Retorna el nombre completo del empleado."""
        return f"{self.name} {self.last_name}"
    
    def save(self, *args, **kwargs):
        """Genera employee_id automáticamente antes de guardar."""
        if not self.employee_id:
            self.employee_id = Employee.objects.generate_employee_id()
        super().save(*args, **kwargs)
