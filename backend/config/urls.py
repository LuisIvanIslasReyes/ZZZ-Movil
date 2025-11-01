"""
URL configuration for ZZZ project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger/OpenAPI schema
schema_view = get_schema_view(
    openapi.Info(
        title="ZZZ API",
        default_version='v1',
        description="API para el sistema Zero to Zero-Fatigue Zone",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@zzz.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # API v1 endpoints
    path('api/v1/', include('apps.users.urls')),
    path('api/v1/', include('apps.metrics.urls')),
    path('api/v1/', include('apps.alerts.urls')),
    path('api/v1/', include('apps.goals.urls')),
    path('api/v1/', include('apps.departments.urls')),
    path('api/v1/', include('apps.work_sessions.urls')),
    path('api/v1/', include('apps.tasks.urls')),
    path('api/v1/', include('apps.wearables.urls')),
    path('api/v1/', include('apps.reports.urls')),
]

# Servir archivos estáticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
