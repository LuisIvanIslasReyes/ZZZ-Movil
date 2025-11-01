from django.contrib import admin
from .models import Goal


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'current_progress', 'target', 'is_completed', 'created_at']
    list_filter = ['category', 'is_completed', 'created_at']
    search_fields = ['title', 'user__username']
    date_hierarchy = 'created_at'
