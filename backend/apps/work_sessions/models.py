from django.db import models
from django.conf import settings
from datetime import timedelta


class WorkSession(models.Model):
    """
    Modelo para registrar sesiones de trabajo (turnos).
    """
    SHIFT_CHOICES = [
        ('morning', 'Mañana'),
        ('afternoon', 'Tarde'),
        ('night', 'Noche'),
        ('custom', 'Personalizado'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='work_sessions',
        verbose_name='Usuario'
    )
    
    department = models.ForeignKey(
        'departments.Department',
        on_delete=models.CASCADE,
        related_name='work_sessions',
        verbose_name='Departamento'
    )
    
    shift = models.CharField(
        max_length=20,
        choices=SHIFT_CHOICES,
        verbose_name='Turno',
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
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Sesión Activa',
        db_index=True
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
        verbose_name = 'Sesión de Trabajo'
        verbose_name_plural = 'Sesiones de Trabajo'
        ordering = ['-start_time']
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['start_time']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.get_shift_display()} - {self.start_time.date()}"
    
    @property
    def duration(self):
        """Calcula la duración de la sesión."""
        if self.end_time:
            delta = self.end_time - self.start_time
            return delta.total_seconds() / 3600  # Retorna horas
        return None
    
    def end_session(self):
        """Finaliza la sesión de trabajo."""
        from django.utils import timezone
        self.end_time = timezone.now()
        self.is_active = False
        self.save()


class ShiftInterval(models.Model):
    """
    Modelo para registrar intervalos dentro de una sesión (pausas, descansos).
    """
    INTERVAL_TYPES = [
        ('break', 'Descanso'),
        ('meal', 'Comida'),
        ('rest', 'Pausa Corta'),
    ]
    
    work_session = models.ForeignKey(
        WorkSession,
        on_delete=models.CASCADE,
        related_name='intervals',
        verbose_name='Sesión de Trabajo'
    )
    
    interval_type = models.CharField(
        max_length=20,
        choices=INTERVAL_TYPES,
        verbose_name='Tipo de Intervalo'
    )
    
    start_time = models.DateTimeField(
        verbose_name='Hora de Inicio'
    )
    
    end_time = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Hora de Finalización'
    )
    
    duration_minutes = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Duración (minutos)'
    )
    
    class Meta:
        verbose_name = 'Intervalo de Descanso'
        verbose_name_plural = 'Intervalos de Descanso'
        ordering = ['start_time']
    
    def __str__(self):
        return f"{self.get_interval_type_display()} - {self.start_time}"
    
    def save(self, *args, **kwargs):
        """Calcula la duración al guardar."""
        if self.end_time and self.start_time:
            delta = self.end_time - self.start_time
            self.duration_minutes = int(delta.total_seconds() / 60)
        super().save(*args, **kwargs)
