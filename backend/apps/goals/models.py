from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class Goal(models.Model):
    """
    Modelo para gestión de metas de los usuarios.
    """
    CATEGORY_CHOICES = [
        ('steps', 'Pasos'),
        ('heart_rate', 'Frecuencia Cardíaca'),
        ('recovery', 'Recuperación'),
        ('stress', 'Nivel de Estrés'),
        ('activity', 'Nivel de Actividad'),
        ('hrv', 'Variabilidad Cardíaca'),
        ('sleep', 'Horas de Sueño'),
        ('productivity', 'Productividad'),
        ('hydration', 'Hidratación'),
        ('nutrition', 'Nutrición'),
        ('weight', 'Peso'),
        ('exercise', 'Ejercicio'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='goals',
        verbose_name='Usuario'
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name='Título'
    )
    
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        verbose_name='Categoría',
        db_index=True
    )
    
    target = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name='Meta Objetivo'
    )
    
    current_progress = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name='Progreso Actual'
    )
    
    unit = models.CharField(
        max_length=50,
        verbose_name='Unidad',
        help_text='Ej: pasos, bpm, horas, %'
    )
    
    start_date = models.DateField(
        verbose_name='Fecha de Inicio'
    )
    
    end_date = models.DateField(
        verbose_name='Fecha de Finalización'
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
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )
    
    class Meta:
        verbose_name = 'Meta'
        verbose_name_plural = 'Metas'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
            models.Index(fields=['category']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"
    
    @property
    def progress_percentage(self):
        """Calcula el porcentaje de progreso."""
        if self.target > 0:
            return min((self.current_progress / self.target) * 100, 100)
        return 0
    
    def update_progress(self, new_value):
        """Actualiza el progreso y verifica si se completó."""
        self.current_progress = new_value
        if self.current_progress >= self.target and not self.is_completed:
            self.is_completed = True
            from django.utils import timezone
            self.completed_at = timezone.now()
        self.save()
