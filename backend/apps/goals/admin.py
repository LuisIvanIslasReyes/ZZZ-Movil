from django.contrib import admin
from .models import Goal


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'category', 'progress_percentage', 'is_completed', 'end_date']
    list_filter = ['category', 'is_completed', 'created_at']
    search_fields = ['user__username', 'title']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at', 'updated_at', 'completed_at', 'progress_percentage']
    
    def progress_percentage(self, obj):
        return f"{obj.progress_percentage:.1f}%"
    progress_percentage.short_description = 'Progreso'
