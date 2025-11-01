from django.db import models
from django.conf import settings


class Wearable(models.Model):
    """
    Modelo para dispositivos wearables (relojes, pulseras).
    """
    STATUS_CHOICES = [
        ('active', 'Activo'),
        ('inactive', 'Inactivo'),
        ('maintenance', 'Mantenimiento'),
        ('damaged', 'Dañado'),
    ]
    
    serial_number = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='Número de Serie',
        db_index=True
    )
    
    model = models.CharField(
        max_length=100,
        verbose_name='Modelo'
    )
    
    manufacturer = models.CharField(
        max_length=100,
        default='Generic',
        verbose_name='Fabricante'
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='Estado',
        db_index=True
    )
    
    firmware_version = models.CharField(
        max_length=50,
        blank=True,
        verbose_name='Versión de Firmware'
    )
    
    battery_level = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Nivel de Batería (%)'
    )
    
    last_sync = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Última Sincronización'
    )
    
    purchase_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Fecha de Compra'
    )
    
    notes = models.TextField(
        blank=True,
        verbose_name='Notas'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Registro'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )
    
    class Meta:
        verbose_name = 'Wearable'
        verbose_name_plural = 'Wearables'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.model} - {self.serial_number}"


class WearableAssignment(models.Model):
    """
    Modelo para asignación de wearables a usuarios.
    """
    wearable = models.ForeignKey(
        Wearable,
        on_delete=models.CASCADE,
        related_name='assignments',
        verbose_name='Wearable'
    )
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='wearable_assignments',
        verbose_name='Usuario'
    )
    
    assigned_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Asignación'
    )
    
    returned_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de Devolución'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Asignación Activa',
        db_index=True
    )
    
    notes = models.TextField(
        blank=True,
        verbose_name='Notas'
    )
    
    class Meta:
        verbose_name = 'Asignación de Wearable'
        verbose_name_plural = 'Asignaciones de Wearables'
        ordering = ['-assigned_date']
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['wearable', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.wearable.serial_number} -> {self.user.username}"
    
    def return_wearable(self):
        """Marca el wearable como devuelto."""
        from django.utils import timezone
        
        self.is_active = False
        self.returned_date = timezone.now()
        self.save()
