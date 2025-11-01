from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import (
    UserSerializer,
    UserUpdateSerializer,
    UserLoginSerializer,
    NotificationSettingsSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Endpoint de inicio de sesión.
    Retorna JWT tokens y datos del usuario autenticado.
    
    POST /api/v1/auth/login/
    Body: {"username": "user", "password": "pass"}
    """
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    
    user = authenticate(username=username, password=password)
    
    if user:
        if not user.is_active:
            return Response(
                {'error': 'La cuenta está desactivada.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)
    
    return Response(
        {'error': 'Credenciales inválidas. Verifica tu usuario y contraseña.'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Endpoint de cierre de sesión.
    El cliente debe eliminar el token localmente.
    
    POST /api/v1/auth/logout/
    """
    return Response(
        {'message': 'Sesión cerrada exitosamente.'},
        status=status.HTTP_200_OK
    )


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de usuarios.
    Endpoints CRUD para usuarios (solo administradores).
    """
    queryset = User.objects.select_related('department').all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar usuarios según rol."""
        user = self.request.user
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'supervisor':
            # Supervisores ven usuarios de su departamento
            return self.queryset.filter(department=user.department)
        else:
            # Empleados solo se ven a sí mismos
            return self.queryset.filter(id=user.id)
    
    @action(detail=False, methods=['get'])
    def profile(self, request):
        """
        Obtiene el perfil del usuario autenticado.
        
        GET /api/v1/users/profile/
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put', 'patch'])
    def update_profile(self, request):
        """
        Actualiza el perfil del usuario autenticado.
        Solo permite editar first_name, last_name y configuraciones.
        
        PUT/PATCH /api/v1/users/update_profile/
        Body: {"first_name": "Nuevo", "last_name": "Nombre"}
        """
        serializer = UserUpdateSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        
        if serializer.is_valid():
            serializer.save()
            # Retornar datos completos del usuario actualizado
            user_serializer = UserSerializer(request.user)
            return Response(user_serializer.data)
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['get', 'patch'])
    def notification_settings(self, request):
        """
        Obtiene o actualiza la configuración de notificaciones.
        
        GET /api/v1/users/notification_settings/
        PATCH /api/v1/users/notification_settings/
        Body: {"fatigue_alerts_enabled": true, ...}
        """
        if request.method == 'GET':
            serializer = NotificationSettingsSerializer(request.user)
            return Response(serializer.data)
        
        # PATCH
        serializer = NotificationSettingsSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        """
        Cambia la contraseña del usuario autenticado.
        
        POST /api/v1/users/change_password/
        Body: {"old_password": "...", "new_password": "..."}
        """
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response(
                {'error': 'Se requieren old_password y new_password.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not user.check_password(old_password):
            return Response(
                {'error': 'La contraseña actual es incorrecta.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(new_password)
        user.save()
        
        return Response(
            {'message': 'Contraseña actualizada exitosamente.'},
            status=status.HTTP_200_OK
        )
