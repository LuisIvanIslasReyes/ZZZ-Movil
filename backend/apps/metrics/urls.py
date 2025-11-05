from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MetricViewSet, MetricTypeViewSet

router = DefaultRouter()
router.register(r'metrics', MetricViewSet, basename='metric')
router.register(r'metric-types', MetricTypeViewSet, basename='metric-type')

urlpatterns = [
    path('', include(router.urls)),
]
