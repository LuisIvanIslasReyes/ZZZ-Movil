from django.contrib import admin
from .models import WorkSession, ShiftInterval


class ShiftIntervalInline(admin.TabularInline):
    model = ShiftInterval
    extra = 0
    readonly_fields = ['duration_minutes']


@admin.register(WorkSession)
class WorkSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'department', 'shift', 'start_time', 'end_time', 'is_active', 'duration']
    list_filter = ['shift', 'is_active', 'start_time']
    search_fields = ['user__username', 'department__name']
    date_hierarchy = 'start_time'
    readonly_fields = ['created_at', 'duration']
    inlines = [ShiftIntervalInline]
    
    def duration(self, obj):
        if obj.duration:
            return f"{obj.duration:.2f} horas"
        return "En progreso"
    duration.short_description = 'Duración'


@admin.register(ShiftInterval)
class ShiftIntervalAdmin(admin.ModelAdmin):
    list_display = ['work_session', 'interval_type', 'start_time', 'end_time', 'duration_minutes']
    list_filter = ['interval_type', 'start_time']
    search_fields = ['work_session__user__username']
    readonly_fields = ['duration_minutes']
