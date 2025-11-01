from django.db import models
from django.conf import settings
import json


class Report(models.Model):
    """
    Modelo para almacenar reportes generados.
    """
    REPORT_TYPES = [
        ('individual', 'Reporte Individual'),
        ('department', 'Reporte de Departamento'),
        ('company', 'Reporte Corporativo'),
        ('fatigue', 'Análisis de Fatiga'),
        ('productivity', 'Análisis de Productividad'),
    ]
    
    report_type = models.CharField(
        max_length=30,
        choices=REPORT_TYPES,
        verbose_name='Tipo de Reporte',
        db_index=True
    )
    
    generated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='generated_reports',
        verbose_name='Generado Por'
    )
    
    department = models.ForeignKey(
        'departments.Department',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reports',
        verbose_name='Departamento'
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name='Título'
    )
    
    start_date = models.DateField(
        verbose_name='Fecha de Inicio'
    )
    
    end_date = models.DateField(
        verbose_name='Fecha de Fin'
    )
    
    parameters = models.JSONField(
        default=dict,
        verbose_name='Parámetros del Reporte'
    )
    
    content = models.JSONField(
        default=dict,
        verbose_name='Contenido del Reporte'
    )
    
    summary = models.TextField(
        blank=True,
        verbose_name='Resumen'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Generación',
        db_index=True
    )
    
    class Meta:
        verbose_name = 'Reporte'
        verbose_name_plural = 'Reportes'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['generated_by', 'report_type']),
            models.Index(fields=['start_date', 'end_date']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.created_at.date()}"
