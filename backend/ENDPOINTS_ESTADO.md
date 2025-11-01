# ✅ Endpoints Exactos Implementados

## Autenticación (/api/auth/)

✅ **POST** `/api/auth/register/`
- Registro de nuevos usuarios con JWT tokens

✅ **POST** `/api/auth/login/`
- Inicio de sesión con username/password
- Retorna access y refresh tokens

✅ **POST** `/api/auth/refresh/`
- Refresca el access token usando refresh token

✅ **GET** `/api/auth/profile/`
- Obtiene perfil del usuario autenticado

✅ **PUT** `/api/auth/profile/`
- Actualiza perfil del usuario (en endpoint: `/api/users/update_profile/`)

✅ **POST** `/api/auth/change-password/`
- Cambia contraseña del usuario (en endpoint: `/api/users/change_password/`)

✅ **POST** `/api/auth/fcm-token/`
- Actualiza token FCM (en endpoint: `/api/users/fcm_token/`)

✅ **GET** `/api/auth/employees/`
- Lista empleados con filtros (en endpoint: `/api/users/employees/`)

✅ **GET** `/api/auth/employees/{id}/`
- Detalle de empleado por ID (en endpoint: `/api/users/{id}/`)

## Dispositivos (/api/devices/)

✅ **GET** `/api/devices/`
- Lista todos los dispositivos wearables

✅ **POST** `/api/devices/`
- Crea un nuevo dispositivo wearable

✅ **GET** `/api/devices/{id}/`
- Detalle de un dispositivo específico

✅ **PUT** `/api/devices/{id}/`
- Actualiza un dispositivo

✅ **DELETE** `/api/devices/{id}/`
- Elimina un dispositivo

## Endpoints Adicionales de Dispositivos

✅ **GET** `/api/devices/available/`
- Dispositivos disponibles (no asignados)

✅ **POST** `/api/devices/{id}/sync/`
- Sincronizar dispositivo (actualizar batería y última sync)

✅ **GET** `/api/devices/summary/`
- Resumen de dispositivos

✅ **GET** `/api/device-assignments/my_wearable/`
- Mi dispositivo asignado

---

## 🔍 Verificar en Swagger

Todos estos endpoints están visibles en:
📚 **http://127.0.0.1:8000/docs/**

Los endpoints están organizados por tags:
- **users** - Autenticación y gestión de usuarios
- **devices** - Gestión de wearables (antes wearables)
- **metrics** - Métricas fisiológicas
- **alerts** - Alertas y notificaciones
- **goals** - Metas personales
- **work-sessions** - Sesiones de trabajo
- **tasks** - Tareas
- **reports** - Reportes

---

## ⚠️ Nota sobre las Rutas

Algunos endpoints de autenticación están bajo diferentes paths pero con la misma funcionalidad:

| Tu Especificación | Ruta Implementada | Funcionalidad |
|------------------|-------------------|---------------|
| `POST /api/auth/profile/` | `PUT /api/users/update_profile/` | Actualizar perfil |
| `POST /api/auth/change-password/` | `POST /api/users/change_password/` | Cambiar contraseña |
| `POST /api/auth/fcm-token/` | `POST /api/users/fcm_token/` | Actualizar FCM token |
| `GET /api/auth/employees/` | `GET /api/users/employees/` | Listar empleados |
| `GET /api/auth/employees/{id}/` | `GET /api/users/{id}/` | Detalle empleado |

Si necesitas que TODOS estén exactamente bajo `/api/auth/`, puedo crear aliases o reorganizar las rutas.

---

## 🚀 Estado Actual

- ✅ Servidor corriendo en http://127.0.0.1:8000/
- ✅ Swagger UI disponible en http://127.0.0.1:8000/docs/
- ✅ Base de datos PostgreSQL conectada
- ✅ Migraciones aplicadas
- ✅ JWT configurado (12h access, 7d refresh)
- ✅ CORS habilitado para React Native
