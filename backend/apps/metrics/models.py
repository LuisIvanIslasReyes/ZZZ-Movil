from django.db import models
from django.conf import settings


class Metric(models.Model):
    """
    Métricas fisiológicas del usuario registradas por el wearable.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='metrics',
        verbose_name='Usuario'
    )
    
    wearable = models.ForeignKey(
        'wearables.Wearable',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='metrics',
        verbose_name='Wearable'
    )
    
    date = models.DateField(
        verbose_name='Fecha',
        db_index=True
    )
    
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Marca de Tiempo'
    )
    
    # Métricas cardiovasculares
    heart_rate = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Frecuencia Cardíaca (bpm)',
        help_text='Latidos por minuto'
    )
    
    hrv = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Variabilidad de FC (RMSSD)',
        help_text='Variabilidad de la frecuencia cardíaca en ms'
    )
    
    spo2 = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Nivel de Oxígeno (SpO2)',
        help_text='Saturación de oxígeno en sangre (%)'
    )
    
    # Métricas de actividad
    steps = models.IntegerField(
        default=0,
        verbose_name='Pasos'
    )
    
    activity_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Actividad',
        help_text='0-100: nivel de actividad física'
    )
    
    movement = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Movimiento',
        help_text='Nivel de movimiento general'
    )
    
    # Métricas de estrés y recuperación
    stress_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Estrés',
        help_text='0-100: nivel de estrés detectado'
    )
    
    fatigue_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Fatiga',
        help_text='0-100: nivel de fatiga'
    )
    
    recovery_score = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Puntuación de Recuperación',
        help_text='0-100: capacidad de recuperación'
    )
    
    # Relaciones opcionales
    work_session = models.ForeignKey(
        'work_sessions.WorkSession',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='metrics',
        verbose_name='Sesión de Trabajo'
    )
    
    task = models.ForeignKey(
        'tasks.Task',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='metrics',
        verbose_name='Tarea'
    )
    
    class Meta:
        verbose_name = 'Métrica'
        verbose_name_plural = 'Métricas'
        ordering = ['-date', '-timestamp']
        indexes = [
            models.Index(fields=['user', 'date']),
            models.Index(fields=['date']),
        ]
        unique_together = [['user', 'date', 'timestamp']]
    
    def __str__(self):
        return f"{self.user.username} - {self.date}"
