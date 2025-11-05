from django.db import models
from django.conf import settings


class MetricType(models.Model):
    """
    Catálogo de tipos de métricas disponibles.
    """
    code = models.CharField(
        max_length=20,
        unique=True,
        primary_key=True,
        verbose_name='Código',
        help_text='Código único: heart_rate, steps, stress_level, etc.'
    )
    
    name = models.CharField(
        max_length=100,
        verbose_name='Nombre',
        help_text='Nombre legible: Frecuencia Cardíaca, Pasos, etc.'
    )
    
    unit = models.CharField(
        max_length=20,
        verbose_name='Unidad',
        help_text='Unidad por defecto: bpm, pasos, %, ms'
    )
    
    description = models.TextField(
        blank=True,
        verbose_name='Descripción'
    )
    
    min_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Valor Mínimo',
        help_text='Valor mínimo permitido'
    )
    
    max_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Valor Máximo',
        help_text='Valor máximo permitido'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    class Meta:
        verbose_name = 'Tipo de Métrica'
        verbose_name_plural = 'Tipos de Métricas'
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.unit})"


class Metric(models.Model):
    """
    Métricas fisiológicas del usuario registradas por el wearable.
    Estructura normalizada con tipo de métrica en tabla separada.
    """
    STRESS_CATEGORIES = [
        ('low', 'Bajo'),      # 0-33%
        ('medium', 'Medio'),  # 34-66%
        ('high', 'Alto'),     # 67-100%
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='metrics',
        verbose_name='Usuario'
    )
    
    metric_type = models.ForeignKey(
        'MetricType',
        on_delete=models.PROTECT,
        related_name='metrics',
        verbose_name='Tipo de Métrica',
        help_text='Tipo de métrica (heart_rate, steps, etc.)'
    )
    
    wearable = models.ForeignKey(
        'wearables.Wearable',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='metrics',
        verbose_name='Wearable'
    )
    
    work_session = models.ForeignKey(
        'work_sessions.WorkSession',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='metrics',
        verbose_name='Sesión de Trabajo',
        help_text='Sesión de trabajo durante la cual se registró esta métrica'
    )
    
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Valor',
        help_text='Valor numérico de la métrica'
    )
    
    stress_category = models.CharField(
        max_length=10,
        choices=STRESS_CATEGORIES,
        blank=True,
        null=True,
        verbose_name='Categoría de Estrés',
        help_text='Categoría de estrés (solo para stress_level)'
    )
    
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Marca de Tiempo',
        db_index=True
    )
    
    class Meta:
        verbose_name = 'Métrica'
        verbose_name_plural = 'Métricas'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', 'metric_type', '-timestamp']),
            models.Index(fields=['work_session', '-timestamp']),
            models.Index(fields=['wearable', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.metric_type.name} - {self.value}{self.metric_type.unit}"
    
    def save(self, *args, **kwargs):
        """
        Calcula automáticamente la categoría de estrés si el tipo es stress_level.
        """
        if self.metric_type_id == 'stress_level' and self.value is not None:
            if self.value <= 33:
                self.stress_category = 'low'
            elif self.value <= 66:
                self.stress_category = 'medium'
            else:
                self.stress_category = 'high'
        super().save(*args, **kwargs)
