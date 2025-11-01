from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WearableViewSet, WearableAssignmentViewSet

router = DefaultRouter()
router.register(r'devices', WearableViewSet, basename='wearable')
router.register(r'device-assignments', WearableAssignmentViewSet, basename='wearable-assignment')

urlpatterns = [
    path('', include(router.urls)),
]
