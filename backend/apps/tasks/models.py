from django.db import models
from django.conf import settings


class Task(models.Model):
    """
    Modelo para registrar tareas durante sesiones de trabajo.
    """
    PRIORITY_CHOICES = [
        ('low', 'Baja'),
        ('medium', 'Media'),
        ('high', 'Alta'),
        ('critical', 'Crítica'),
    ]
    
    RISK_LEVEL_CHOICES = [
        ('low', 'Bajo'),
        ('medium', 'Medio'),
        ('high', 'Alto'),
    ]
    
    work_session = models.ForeignKey(
        'work_sessions.WorkSession',
        on_delete=models.CASCADE,
        related_name='tasks',
        verbose_name='Sesión de Trabajo'
    )
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tasks',
        verbose_name='Usuario'
    )
    
    task_name = models.CharField(
        max_length=200,
        verbose_name='Nombre de la Tarea'
    )
    
    description = models.TextField(
        blank=True,
        verbose_name='Descripción'
    )
    
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        verbose_name='Prioridad',
        db_index=True
    )
    
    fatigue_risk_level = models.CharField(
        max_length=20,
        choices=RISK_LEVEL_CHOICES,
        default='low',
        verbose_name='Nivel de Riesgo de Fatiga',
        db_index=True
    )
    
    start_time = models.DateTimeField(
        verbose_name='Hora de Inicio'
    )
    
    end_time = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Hora de Finalización'
    )
    
    estimated_duration = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Duración Estimada (minutos)'
    )
    
    actual_duration = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Duración Real (minutos)'
    )
    
    is_completed = models.BooleanField(
        default=False,
        verbose_name='Completada',
        db_index=True
    )
    
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de Completación'
    )
    
    notes = models.TextField(
        blank=True,
        verbose_name='Notas'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    
    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'
        ordering = ['-start_time']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
            models.Index(fields=['work_session', 'start_time']),
        ]
    
    def __str__(self):
        return f"{self.task_name} - {self.user.username}"
    
    def complete_task(self):
        """Marca la tarea como completada y calcula duración real."""
        from django.utils import timezone
        
        self.is_completed = True
        self.completed_at = timezone.now()
        
        if self.start_time:
            delta = self.completed_at - self.start_time
            self.actual_duration = int(delta.total_seconds() / 60)
        
        self.save()
