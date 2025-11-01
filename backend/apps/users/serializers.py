from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer para registro de nuevos usuarios.
    """
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password_confirm',
            'first_name',
            'last_name',
            'employee_id',
            'department',
            'location',
        ]
    
    def validate(self, attrs):
        """Validar que las contraseñas coincidan."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden."
            })
        return attrs
    
    def create(self, validated_data):
        """Crear usuario con contraseña hasheada."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer principal para el modelo User.
    Expone información completa del perfil.
    """
    full_name = serializers.CharField(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True, allow_null=True)
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'employee_id',
            'role',
            'department',
            'department_name',
            'location',
            'hire_date',
            'notifications_enabled',
            'fatigue_alerts_enabled',
            'ai_recommendations_enabled',
            'sync_enabled',
            'is_active',
            'date_joined',
        ]
        read_only_fields = ['id', 'username', 'date_joined', 'role']
    
    def validate_email(self, value):
        """Validar que el email sea único."""
        user = self.instance
        if User.objects.exclude(pk=user.pk if user else None).filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para actualizar información del perfil.
    Solo permite editar campos específicos.
    """
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'notifications_enabled',
            'fatigue_alerts_enabled',
            'ai_recommendations_enabled',
            'sync_enabled',
        ]
    
    def validate(self, data):
        """Validaciones personalizadas."""
        if 'first_name' in data and not data['first_name'].strip():
            raise serializers.ValidationError({
                'first_name': 'El nombre no puede estar vacío.'
            })
        if 'last_name' in data and not data['last_name'].strip():
            raise serializers.ValidationError({
                'last_name': 'El apellido no puede estar vacío.'
            })
        return data


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer para el endpoint de login.
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        """Validar que los campos no estén vacíos."""
        if not data.get('username'):
            raise serializers.ValidationError({
                'username': 'El nombre de usuario es requerido.'
            })
        if not data.get('password'):
            raise serializers.ValidationError({
                'password': 'La contraseña es requerida.'
            })
        return data


class NotificationSettingsSerializer(serializers.ModelSerializer):
    """
    Serializer específico para configuración de notificaciones.
    """
    class Meta:
        model = User
        fields = [
            'notifications_enabled',
            'fatigue_alerts_enabled',
            'ai_recommendations_enabled',
            'sync_enabled',
        ]
