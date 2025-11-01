from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkSessionViewSet, ShiftIntervalViewSet

router = DefaultRouter()
router.register(r'work-sessions', WorkSessionViewSet, basename='work-session')
router.register(r'shift-intervals', ShiftIntervalViewSet, basename='shift-interval')

urlpatterns = [
    path('', include(router.urls)),
]
