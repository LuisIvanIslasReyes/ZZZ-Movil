# ZZZ Backend - Django Rest Framework

Backend modular y profesional para el sistema Zero to Zero-Fatigue Zone (ZZZ).

## 📁 Estructura Modular

```
backend/
├── users/              # Gestión de usuarios y autenticación
├── metrics/            # Métricas fisiológicas
├── alerts/             # Sistema de alertas
├── goals/              # Metas personales
└── zzz_backend/        # Configuración principal del proyecto
```

## 🚀 Instalación y Configuración

### 1. Crear entorno virtual

```bash
python -m venv venv
```

### 2. Activar entorno virtual

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Aplicar migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Crear superusuario

```bash
python manage.py createsuperuser
```

### 6. Ejecutar servidor de desarrollo

```bash
python manage.py runserver
```

El servidor estará disponible en: `http://127.0.0.1:8000/`

## 📊 Endpoints Disponibles

### Autenticación
- **POST** `/api/auth/login/` - Iniciar sesión (retorna JWT tokens)

### Usuarios
- **GET** `/api/users/profile/` - Obtener perfil del usuario autenticado
- **PUT** `/api/users/update_profile/` - Actualizar perfil (solo nombre)
- **POST** `/api/users/logout/` - Cerrar sesión

## 🔐 Autenticación JWT

El sistema usa JWT (JSON Web Tokens) para autenticación. 

### Cómo usar:

1. **Login**: Envía POST a `/api/auth/login/` con:
```json
{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

2. **Respuesta**:
```json
{
  "refresh": "token_de_refresco",
  "access": "token_de_acceso",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "email@example.com",
    ...
  }
}
```

3. **Usar el token**: En las siguientes peticiones, incluye el header:
```
Authorization: Bearer {access_token}
```

## 🧪 Probar con Postman/Thunder Client

1. Login: POST `http://127.0.0.1:8000/api/auth/login/`
2. Copiar el `access` token de la respuesta
3. Para endpoints protegidos, agregar header:
   - Key: `Authorization`
   - Value: `Bearer {tu_access_token}`

## 📱 Integración con React Native

En tu app móvil, guarda el token después del login y úsalo en todas las peticiones:

```javascript
const token = 'tu_access_token';

fetch('http://127.0.0.1:8000/api/users/profile/', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
})
```

## 🛠️ Comandos Útiles

```bash
# Crear migraciones después de cambios en modelos
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear datos de prueba (shell interactivo)
python manage.py shell

# Acceder al admin
# http://127.0.0.1:8000/admin/
```

## 📦 Próximos Módulos

- [ ] Endpoints para métricas (HomeScreen)
- [ ] Endpoints para alertas (AlertsScreen)
- [ ] Endpoints para metas (GoalsScreen)
- [ ] WebSockets para alertas en tiempo real
- [ ] Módulo de Machine Learning para recomendaciones

## 🎯 Características Implementadas

✅ Estructura modular profesional
✅ Autenticación JWT segura
✅ Login y perfil de usuario
✅ CORS configurado para React Native
✅ Modelos para usuarios, métricas, alertas y metas
✅ Panel de administración de Django

## 📝 Notas

- El token de acceso expira en 12 horas
- El token de refresco expira en 7 días
- Cambia el `SECRET_KEY` en producción
- Configura variables de entorno para producción
