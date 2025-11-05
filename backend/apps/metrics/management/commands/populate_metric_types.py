from django.core.management.base import BaseCommand
from apps.metrics.models import MetricType


class Command(BaseCommand):
    help = 'Poblar la tabla MetricType con los tipos de métricas iniciales'

    def handle(self, *args, **kwargs):
        metric_types = [
            {
                'code': 'heart_rate',
                'name': 'Frecuencia Cardíaca',
                'unit': 'bpm',
                'description': 'Frecuencia cardíaca en latidos por minuto',
                'min_value': 40,
                'max_value': 200,
            },
            {
                'code': 'steps',
                'name': 'Pasos',
                'unit': 'pasos',
                'description': 'Número de pasos dados',
                'min_value': 0,
                'max_value': 50000,
            },
            {
                'code': 'stress_level',
                'name': 'Nivel de Estrés',
                'unit': '%',
                'description': 'Nivel de estrés detectado (0-100%)',
                'min_value': 0,
                'max_value': 100,
            },
            {
                'code': 'hrv',
                'name': 'Variabilidad FC',
                'unit': 'ms',
                'description': 'Variabilidad de la frecuencia cardíaca (RMSSD)',
                'min_value': 0,
                'max_value': 200,
            },
            {
                'code': 'activity_level',
                'name': 'Nivel de Actividad',
                'unit': '%',
                'description': 'Nivel de actividad física (0-100%)',
                'min_value': 0,
                'max_value': 100,
            },
        ]

        created_count = 0
        updated_count = 0

        for mt_data in metric_types:
            metric_type, created = MetricType.objects.update_or_create(
                code=mt_data['code'],
                defaults={
                    'name': mt_data['name'],
                    'unit': mt_data['unit'],
                    'description': mt_data['description'],
                    'min_value': mt_data['min_value'],
                    'max_value': mt_data['max_value'],
                    'is_active': True,
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Creado: {metric_type.name}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    self.style.WARNING(f'↻ Actualizado: {metric_type.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Proceso completado: {created_count} creados, {updated_count} actualizados'
            )
        )
