from django.db import models
from django.conf import settings


class Metric(models.Model):
    """
    Modelo para almacenar métricas fisiológicas del usuario.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='metrics'
    )
    date = models.DateField(verbose_name='Fecha')
    heart_rate = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Frecuencia Cardíaca'
    )
    spo2 = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Nivel de Oxígeno (SpO2)'
    )
    steps = models.IntegerField(
        default=0,
        verbose_name='Pasos'
    )
    movement = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Nivel de Movimiento'
    )
    stress_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Estrés'
    )
    hrv = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Variabilidad de Frecuencia Cardíaca (HRV)'
    )
    activity_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Actividad'
    )
    recovery_score = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Puntuación de Recuperación'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Métrica'
        verbose_name_plural = 'Métricas'
        ordering = ['-date', '-created_at']
        unique_together = ['user', 'date']
    
    def __str__(self):
        return f"{self.user.username} - {self.date}"
