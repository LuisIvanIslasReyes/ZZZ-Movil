from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo User.
    Expone los datos necesarios para el ProfileScreen.
    """
    full_name = serializers.SerializerMethodField()
    
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
            'location',
            'hire_date'
        ]
        read_only_fields = ['id', 'username']
    
    def get_full_name(self, obj):
        """Retorna el nombre completo del usuario."""
        return obj.get_full_name() or obj.username


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializador para actualizar el perfil del usuario.
    Solo permite editar ciertos campos (nombre).
    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name']
    
    def validate(self, data):
        """Validaciones personalizadas."""
        if not data.get('first_name') and not data.get('last_name'):
            raise serializers.ValidationError(
                "Debe proporcionar al menos un nombre."
            )
        return data
