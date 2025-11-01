from django.db import models
from django.conf import settings


class Alert(models.Model):
    """
    Modelo para alertas del sistema.
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
        related_name='alerts'
    )
    alert_type = models.CharField(
        max_length=20,
        choices=ALERT_TYPES,
        verbose_name='Tipo de Alerta'
    )
    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        verbose_name='Nivel'
    )
    title = models.CharField(
        max_length=200,
        verbose_name='Título'
    )
    message = models.TextField(verbose_name='Mensaje')
    is_read = models.BooleanField(
        default=False,
        verbose_name='Leída'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    
    class Meta:
        verbose_name = 'Alerta'
        verbose_name_plural = 'Alertas'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_level_display()} - {self.title}"
