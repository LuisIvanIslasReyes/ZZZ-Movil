from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, register_view, login_view, logout_view, refresh_token_view

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Autenticación
    path('auth/register/', register_view, name='register'),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/refresh/', refresh_token_view, name='refresh-token'),
    
    # CRUD de usuarios + acciones
    path('', include(router.urls)),
]
