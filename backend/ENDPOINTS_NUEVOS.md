# Nuevos Endpoints Agregados - ZZZ Backend

## ✅ Endpoints de Autenticación

### 1. Registro de Usuario
```http
POST /api/v1/auth/register/
Content-Type: application/json

{
  "username": "usuario123",
  "email": "user@example.com",
  "password": "Password123!",
  "password_confirm": "Password123!",
  "first_name": "Juan",
  "last_name": "Pérez",
  "employee_id": "EMP001",
  "department": 1,
  "location": "Oficina Central"
}
```

**Respuesta exitosa (201):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "user@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "employee_id": "EMP001",
    "role": "employee",
    ...
  },
  "message": "Usuario registrado exitosamente."
}
```

### 2. Refresh Token JWT
```http
POST /api/v1/auth/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Respuesta exitosa (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "message": "Token refrescado exitosamente."
}
```

**Errores posibles:**
- 400: Falta el refresh token
- 401: Token inválido o expirado

---

## ✅ Endpoints de Usuarios

### 3. Listar Empleados
```http
GET /api/v1/users/employees/
Authorization: Bearer {access_token}

# Filtros opcionales:
GET /api/v1/users/employees/?role=employee
GET /api/v1/users/employees/?department=1
GET /api/v1/users/employees/?is_active=true
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "username": "usuario1",
    "email": "user1@example.com",
    "full_name": "Juan Pérez",
    "employee_id": "EMP001",
    "role": "employee",
    "department": 1,
    "department_name": "Producción",
    "location": "Planta 1",
    ...
  },
  ...
]
```

**Permisos:**
- **Admin**: Ve todos los empleados
- **Supervisor**: Ve empleados de su departamento
- **Employee**: Solo se ve a sí mismo

### 4. Detalle de Empleado por ID
```http
GET /api/v1/users/{id}/
Authorization: Bearer {access_token}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "username": "usuario1",
  "email": "user1@example.com",
  "full_name": "Juan Pérez",
  "employee_id": "EMP001",
  "role": "employee",
  "department": 1,
  "department_name": "Producción",
  "location": "Planta 1",
  "hire_date": "2024-01-15",
  "notifications_enabled": true,
  "fatigue_alerts_enabled": true,
  "ai_recommendations_enabled": true,
  "sync_enabled": true,
  "is_active": true,
  "date_joined": "2024-01-15T10:00:00Z"
}
```

### 5. Actualizar FCM Token (Firebase Cloud Messaging)
```http
POST /api/v1/users/fcm_token/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "fcm_token": "dFx_9K8TQy2w7..."
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "FCM token actualizado exitosamente.",
  "fcm_token": "dFx_9K8TQy2w7..."
}
```

**Uso:** Este token se utiliza para enviar notificaciones push al dispositivo móvil del usuario a través de Firebase Cloud Messaging.

---

## 📋 Resumen de Endpoints Completos

### Autenticación (/api/v1/auth/)
- ✅ `POST /register/` - Registro de usuario con JWT
- ✅ `POST /login/` - Login con JWT
- ✅ `POST /logout/` - Cerrar sesión
- ✅ `POST /refresh/` - Refrescar access token

### Usuarios (/api/v1/users/)
- ✅ `GET /profile/` - Perfil del usuario autenticado
- ✅ `PUT /update_profile/` - Actualizar perfil
- ✅ `PATCH /notification_settings/` - Configurar notificaciones
- ✅ `POST /change_password/` - Cambiar contraseña
- ✅ `GET /employees/` - Listar empleados (con filtros)
- ✅ `GET /{id}/` - Detalle de empleado por ID
- ✅ `POST /fcm_token/` - Actualizar token FCM
- ✅ `GET /` - Listar todos los usuarios (admin)
- ✅ `POST /` - Crear usuario (admin)
- ✅ `PUT /{id}/` - Actualizar usuario (admin)
- ✅ `DELETE /{id}/` - Eliminar usuario (admin)

### Dispositivos (/api/v1/wearables/)
- ✅ `GET /` - Listar dispositivos wearables
- ✅ `POST /` - Crear dispositivo
- ✅ `GET /{id}/` - Detalle de dispositivo
- ✅ `PUT /{id}/` - Actualizar dispositivo
- ✅ `DELETE /{id}/` - Eliminar dispositivo
- ✅ `GET /available/` - Dispositivos disponibles
- ✅ `POST /{id}/sync/` - Sincronizar dispositivo
- ✅ `GET /summary/` - Resumen de dispositivos

### Asignaciones de Wearables (/api/v1/wearable-assignments/)
- ✅ `GET /` - Listar asignaciones
- ✅ `POST /` - Crear asignación
- ✅ `GET /my_wearable/` - Mi wearable asignado
- ✅ `POST /{id}/return_device/` - Devolver dispositivo

---

## 🔐 Autenticación JWT

**Tokens generados:**
- **Access Token**: Válido por 12 horas
- **Refresh Token**: Válido por 7 días

**Uso en headers:**
```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Flujo de autenticación:**
1. Usuario se registra o inicia sesión → Recibe `access` y `refresh` tokens
2. Incluye `access` token en todas las peticiones protegidas
3. Cuando `access` expira → Usa `/auth/refresh/` con `refresh` token
4. Obtiene nuevo `access` token sin volver a hacer login

---

## 🧪 Probar Endpoints

### Swagger UI
Visita: http://127.0.0.1:8000/docs/

### Ejemplo con cURL
```bash
# Registro
curl -X POST http://127.0.0.1:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "Test123!",
    "password_confirm": "Test123!",
    "first_name": "Test",
    "last_name": "User",
    "employee_id": "EMP999"
  }'

# Login
curl -X POST http://127.0.0.1:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "Test123!"
  }'

# Listar empleados (con token)
curl -X GET http://127.0.0.1:8000/api/v1/users/employees/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📝 Notas Importantes

1. **Validación de Contraseñas**: Las contraseñas deben cumplir los requisitos de Django (mínimo 8 caracteres, no muy común, etc.)

2. **Roles de Usuario**:
   - `employee`: Usuario estándar
   - `supervisor`: Supervisor de departamento
   - `admin`: Administrador del sistema

3. **FCM Token**: 
   - Se actualiza cada vez que la app móvil se inicia
   - Permite enviar notificaciones push al dispositivo
   - Es opcional (puede estar vacío)

4. **CORS**: Ya está configurado para React Native en puerto 8081

---

¡Todos los endpoints solicitados están implementados y listos para usar! 🚀
