"""
URL configuration for zzz_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints (modular)
    path('api/', include('users.urls')),
    # path('api/', include('metrics.urls')),  # Agregar cuando se creen
    # path('api/', include('alerts.urls')),   # Agregar cuando se creen
    # path('api/', include('goals.urls')),    # Agregar cuando se creen
]
