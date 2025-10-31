from django.db import models
from django.conf import settings


class Goal(models.Model):
    """
    Modelo para metas personales de usuarios.
    """
    CATEGORY_CHOICES = [
        ('actividad', 'Actividad Física'),
        ('hidratacion', 'Hidratación'),
        ('descanso', 'Descanso'),
        ('nutricion', 'Nutrición'),
        ('mental', 'Bienestar Mental'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='goals'
    )
    title = models.CharField(
        max_length=200,
        verbose_name='Título'
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name='Categoría'
    )
    target = models.IntegerField(verbose_name='Objetivo')
    unit = models.CharField(
        max_length=50,
        verbose_name='Unidad'
    )
    current_progress = models.IntegerField(
        default=0,
        verbose_name='Progreso Actual'
    )
    is_completed = models.BooleanField(
        default=False,
        verbose_name='Completada'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    due_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Fecha Límite'
    )
    
    class Meta:
        verbose_name = 'Meta'
        verbose_name_plural = 'Metas'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"
    
    @property
    def progress_percentage(self):
        """Calcula el porcentaje de progreso."""
        if self.target == 0:
            return 0
        return min(100, int((self.current_progress / self.target) * 100))
