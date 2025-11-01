from django.db import models
from django.conf import settings


class Alert(models.Model):
    """
    Sistema de alertas y notificaciones para usuarios.
    """
    ALERT_TYPES = [
        ('fatigue', 'Fatiga'),
        ('health', 'Salud'),
        ('productivity', 'Productividad'),
        ('safety', 'Seguridad'),
    ]
    
    LEVEL_CHOICES = [
        ('low', 'Bajo'),
        ('medium', 'Medio'),
        ('high', 'Alto'),
        ('critical', 'Crítico'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='alerts',
        verbose_name='Usuario'
    )
    
    metric = models.ForeignKey(
        'metrics.Metric',
        on_delete=models.CASCADE,
        related_name='alerts',
        verbose_name='Métrica Relacionada'
    )
    
    alert_type = models.CharField(
        max_length=20,
        choices=ALERT_TYPES,
        verbose_name='Tipo de Alerta',
        db_index=True
    )
    
    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        verbose_name='Nivel',
        db_index=True
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name='Título'
    )
    
    message = models.TextField(
        verbose_name='Mensaje'
    )
    
    is_read = models.BooleanField(
        default=False,
        verbose_name='Leída',
        db_index=True
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    
    read_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de Lectura'
    )
    
    class Meta:
        verbose_name = 'Alerta'
        verbose_name_plural = 'Alertas'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_read']),
            models.Index(fields=['alert_type', 'level']),
        ]
    
    def __str__(self):
        return f"{self.get_level_display()} - {self.title}"
