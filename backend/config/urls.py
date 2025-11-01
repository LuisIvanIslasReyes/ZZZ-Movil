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
    url='http://127.0.0.1:8000/',
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui-alias'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # API endpoints (sin versión v1 para coincidir con especificación)
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.metrics.urls')),
    path('api/', include('apps.alerts.urls')),
    path('api/', include('apps.goals.urls')),
    path('api/', include('apps.departments.urls')),
    path('api/', include('apps.work_sessions.urls')),
    path('api/', include('apps.tasks.urls')),
    path('api/', include('apps.wearables.urls')),
    path('api/', include('apps.reports.urls')),
]

# Servir archivos estáticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
