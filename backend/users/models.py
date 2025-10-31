from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Modelo de Usuario extendido para el sistema ZZZ.
    Incluye información adicional del empleado.
    """
    ROLE_CHOICES = [
        ('employee', 'Empleado'),
        ('supervisor', 'Supervisor'),
        ('admin', 'Administrador'),
    ]
    
    employee_id = models.CharField(
        max_length=20, 
        unique=True, 
        null=True, 
        blank=True,
        verbose_name='ID de Empleado'
    )
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES, 
        default='employee',
        verbose_name='Rol'
    )
    department = models.CharField(
        max_length=100, 
        null=True, 
        blank=True,
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
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.username})"
