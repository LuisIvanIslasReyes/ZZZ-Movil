# Documentación de Endpoints - API ZZZ

Esta documentación describe todos los endpoints disponibles en la API del sistema Zero to Zero-Fatigue Zone. Cada endpoint incluye información detallada sobre su propósito, método HTTP, ruta, autenticación requerida, parámetros y ejemplos de uso.

---

## Índice

1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Metas Personales](#metas-personales)
4. [Métricas](#métricas)
5. [Alertas](#alertas)
6. [Departamentos](#departamentos)
7. [Sesiones de Trabajo](#sesiones-de-trabajo)
8. [Tareas](#tareas)
9. [Dispositivos Wearables](#dispositivos-wearables)
10. [Reportes](#reportes)

---

## Autenticación

La mayoría de endpoints requieren autenticación mediante **JWT (JSON Web Tokens)**. Debes incluir el token en el encabezado de cada petición:

```
Authorization: Bearer <tu_token_de_acceso>
```

### 1.1. Registrar Usuario

**Descripción:** Crea una nueva cuenta de usuario en el sistema.

- **Método:** `POST`
- **Ruta:** `/api/auth/register/`
- **Autenticación:** No requerida
- **Cuerpo de la petición:**
```json
{
  "username": "juan.perez",
  "email": "juan.perez@empresa.com",
  "password": "contraseña123",
  "password_confirm": "contraseña123",
  "first_name": "Juan",
  "last_name": "Pérez",
  "employee_id": "EMP001",
  "department": 1,
  "location": "Oficina Central"
}
```
- **Respuesta exitosa (201):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJh...",
  "access": "eyJ0eXAiOiJKV1QiLCJh...",
  "user": {
    "id": 1,
    "username": "juan.perez",
    "email": "juan.perez@empresa.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "employee"
  },
  "message": "Usuario registrado exitosamente."
}
```

### 1.2. Iniciar Sesión

**Descripción:** Inicia sesión con un usuario existente y obtiene tokens de acceso.

- **Método:** `POST`
- **Ruta:** `/api/auth/login/`
- **Autenticación:** No requerida
- **Cuerpo de la petición:**
```json
{
  "username": "juan.perez",
  "password": "contraseña123"
}
```
- **Respuesta exitosa (200):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJh...",
  "access": "eyJ0eXAiOiJKV1QiLCJh...",
  "user": {
    "id": 1,
    "username": "juan.perez",
    "email": "juan.perez@empresa.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "employee",
    "employee_profile": {
      "employee_id": "EMP001",
      "department": {
        "id": 1,
        "name": "Recursos Humanos"
      },
      "location": "Oficina Central"
    }
  }
}
```

### 1.3. Cerrar Sesión

**Descripción:** Cierra la sesión del usuario actual. El cliente debe eliminar los tokens almacenados localmente.

- **Método:** `POST`
- **Ruta:** `/api/auth/logout/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:** No requiere
- **Respuesta exitosa (200):**
```json
{
  "message": "Sesión cerrada exitosamente."
}
```

### 1.4. Refrescar Token de Acceso

**Descripción:** Obtiene un nuevo token de acceso usando el token de refresco. Útil cuando el token de acceso ha expirado.

- **Método:** `POST`
- **Ruta:** `/api/auth/refresh/`
- **Autenticación:** No requerida
- **Cuerpo de la petición:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJh..."
}
```
- **Respuesta exitosa (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJh...",
  "message": "Token refrescado exitosamente."
}
```

---

## Usuarios

### 2.1. Obtener Perfil del Usuario Autenticado

**Descripción:** Obtiene la información completa del perfil del usuario que está actualmente autenticado.

- **Método:** `GET`
- **Ruta:** `/api/users/profile/`
- **Autenticación:** Requerida
- **Parámetros:** Ninguno
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "username": "juan.perez",
  "email": "juan.perez@empresa.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "employee",
  "is_active": true,
  "employee_profile": {
    "employee_id": "EMP001",
    "department": {
      "id": 1,
      "name": "Recursos Humanos",
      "description": "Departamento de gestión de personal"
    },
    "location": "Oficina Central",
    "hire_date": "2024-01-15"
  }
}
```

### 2.2. Actualizar Perfil del Usuario

**Descripción:** Permite al usuario autenticado actualizar su información personal (nombre, apellido).

- **Método:** `PUT` o `PATCH`
- **Ruta:** `/api/users/update_profile/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "first_name": "Juan Carlos",
  "last_name": "Pérez González"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "username": "juan.perez",
  "first_name": "Juan Carlos",
  "last_name": "Pérez González",
  "message": "Perfil actualizado exitosamente."
}
```

### 2.3. Actualizar Información de Empleado

**Descripción:** Permite actualizar la información laboral del empleado (departamento, ubicación, etc).

- **Método:** `PUT` o `PATCH`
- **Ruta:** `/api/users/update_employee/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "department": 2,
  "location": "Oficina Norte"
}
```
- **Respuesta exitosa (200):**
```json
{
  "employee_id": "EMP001",
  "department": {
    "id": 2,
    "name": "Tecnología"
  },
  "location": "Oficina Norte",
  "message": "Información de empleado actualizada."
}
```

### 2.4. Listar Todos los Usuarios

**Descripción:** Obtiene una lista de todos los usuarios registrados en el sistema. Los usuarios regulares solo pueden ver su propio perfil, mientras que los administradores pueden ver todos los usuarios.

- **Método:** `GET`
- **Ruta:** `/api/users/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `role`: Filtrar por rol (employee, supervisor, admin)
  - `department`: Filtrar por ID de departamento
  - `is_active`: Filtrar por estado (true/false)
- **Respuesta exitosa (200):**
```json
{
  "count": 25,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "juan.perez",
      "email": "juan.perez@empresa.com",
      "first_name": "Juan",
      "last_name": "Pérez",
      "role": "employee"
    },
    {
      "id": 2,
      "username": "maria.garcia",
      "email": "maria.garcia@empresa.com",
      "first_name": "María",
      "last_name": "García",
      "role": "supervisor"
    }
  ]
}
```

### 2.5. Obtener Detalles de un Usuario Específico

**Descripción:** Obtiene información detallada de un usuario específico por su ID.

- **Método:** `GET`
- **Ruta:** `/api/users/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID del usuario
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "username": "juan.perez",
  "email": "juan.perez@empresa.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "employee",
  "employee_profile": {
    "employee_id": "EMP001",
    "department": {
      "id": 1,
      "name": "Recursos Humanos"
    },
    "location": "Oficina Central"
  }
}
```

---

## Metas Personales

### 3.1. Listar Metas del Usuario

**Descripción:** Obtiene todas las metas personales creadas por el usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/api/goals/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `category`: Filtrar por categoría (steps, hydration, sleep, etc)
  - `is_completed`: Filtrar por estado (true/false)
- **Respuesta exitosa (200):**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Pasos diarios",
      "category": "steps",
      "category_display": "Pasos",
      "target": "5000.00",
      "current_progress": "2750.00",
      "unit": "Pasos",
      "progress_percentage": "55.00",
      "start_date": "2025-11-01",
      "end_date": "2025-12-01",
      "is_completed": false,
      "completed_at": null,
      "created_at": "2025-11-01T10:30:00Z",
      "updated_at": "2025-11-01T15:45:00Z"
    },
    {
      "id": 2,
      "title": "Tomar agua",
      "category": "hydration",
      "category_display": "Hidratación",
      "target": "3.00",
      "current_progress": "1.50",
      "unit": "Litros",
      "progress_percentage": "50.00",
      "start_date": "2025-11-01",
      "end_date": "2025-12-01",
      "is_completed": false,
      "completed_at": null,
      "created_at": "2025-11-01T11:00:00Z",
      "updated_at": "2025-11-01T14:30:00Z"
    }
  ]
}
```

### 3.2. Crear Nueva Meta

**Descripción:** Crea una nueva meta personal para el usuario autenticado.

- **Método:** `POST`
- **Ruta:** `/api/goals/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "title": "Dormir 8 horas",
  "category": "sleep",
  "target": "8",
  "unit": "Horas"
}
```
- **Notas:**
  - Los campos `start_date` y `end_date` son opcionales. Si no se proporcionan, se asignan automáticamente (hoy y 30 días después)
  - Las categorías disponibles son: steps, heart_rate, recovery, stress, activity, hrv, sleep, productivity, hydration, nutrition, weight, exercise
- **Respuesta exitosa (201):**
```json
{
  "id": 3,
  "title": "Dormir 8 horas",
  "category": "sleep",
  "category_display": "Horas de Sueño",
  "target": "8.00",
  "current_progress": "0.00",
  "unit": "Horas",
  "progress_percentage": "0.00",
  "start_date": "2025-11-01",
  "end_date": "2025-12-01",
  "is_completed": false,
  "completed_at": null,
  "created_at": "2025-11-01T16:00:00Z",
  "updated_at": "2025-11-01T16:00:00Z"
}
```

### 3.3. Obtener Detalles de una Meta

**Descripción:** Obtiene información detallada de una meta específica.

- **Método:** `GET`
- **Ruta:** `/api/goals/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la meta
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "title": "Pasos diarios",
  "category": "steps",
  "category_display": "Pasos",
  "target": "5000.00",
  "current_progress": "2750.00",
  "unit": "Pasos",
  "progress_percentage": "55.00",
  "start_date": "2025-11-01",
  "end_date": "2025-12-01",
  "is_completed": false,
  "completed_at": null
}
```

### 3.4. Actualizar Meta

**Descripción:** Actualiza los datos de una meta existente (título, objetivo, unidad, etc).

- **Método:** `PUT` o `PATCH`
- **Ruta:** `/api/goals/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la meta
- **Cuerpo de la petición:**
```json
{
  "title": "Caminar 10000 pasos",
  "target": "10000"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "title": "Caminar 10000 pasos",
  "target": "10000.00",
  "current_progress": "2750.00",
  "progress_percentage": "27.50",
  "message": "Meta actualizada exitosamente."
}
```

### 3.5. Eliminar Meta

**Descripción:** Elimina permanentemente una meta del sistema.

- **Método:** `DELETE`
- **Ruta:** `/api/goals/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la meta
- **Respuesta exitosa (204):** Sin contenido

### 3.6. Actualizar Progreso de una Meta

**Descripción:** Actualiza el progreso actual de una meta. Si el progreso alcanza o supera el objetivo, la meta se marca automáticamente como completada.

- **Método:** `POST`
- **Ruta:** `/api/goals/{id}/update_progress/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la meta
- **Cuerpo de la petición:**
```json
{
  "current_progress": 4500
}
```
- **Respuesta exitosa (200):**
```json
{
  "message": "Progreso actualizado exitosamente.",
  "goal": {
    "id": 1,
    "title": "Pasos diarios",
    "current_progress": "4500.00",
    "target": "5000.00",
    "progress_percentage": "90.00",
    "is_completed": false
  }
}
```

### 3.7. Obtener Resumen de Metas

**Descripción:** Obtiene un resumen estadístico de todas las metas del usuario (total, activas, completadas, etc).

- **Método:** `GET`
- **Ruta:** `/api/goals/summary/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "total": 5,
  "active": 3,
  "completed": 2,
  "overall_progress": 2550.50,
  "by_category": {
    "steps": 2,
    "hydration": 1,
    "sleep": 2
  }
}
```

### 3.8. Obtener Recomendaciones Personalizadas

**Descripción:** Obtiene recomendaciones basadas en el progreso actual de las metas del usuario.

- **Método:** `GET`
- **Ruta:** `/api/goals/recommendations/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "date": "2025-11-01",
  "recommendations": [
    {
      "goal_id": 1,
      "title": "Pasos diarios",
      "message": "Estás al 20% de tu meta. ¡Puedes lograrlo! Establece recordatorios diarios.",
      "priority": "high"
    },
    {
      "goal_id": 2,
      "title": "Tomar agua",
      "message": "Vas por buen camino con 50% completado. Mantén el ritmo.",
      "priority": "medium"
    }
  ]
}
```

---

## Métricas

### 4.1. Listar Métricas del Usuario

**Descripción:** Obtiene todas las métricas biométricas registradas para el usuario autenticado (frecuencia cardíaca, nivel de estrés, actividad, etc).

- **Método:** `GET`
- **Ruta:** `/api/metrics/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `start_date`: Fecha de inicio (formato: YYYY-MM-DD)
  - `end_date`: Fecha de fin (formato: YYYY-MM-DD)
  - `metric_type`: Tipo de métrica (heart_rate, stress, activity, etc)
- **Respuesta exitosa (200):**
```json
{
  "count": 50,
  "next": "http://api.example.com/api/metrics/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": 1,
      "heart_rate": 72,
      "stress_level": 3,
      "activity_level": 65,
      "timestamp": "2025-11-01T10:30:00Z",
      "wearable": {
        "id": 1,
        "name": "Fitbit Charge 5"
      }
    }
  ]
}
```

### 4.2. Crear Nueva Métrica

**Descripción:** Registra una nueva medición de métricas biométricas.

- **Método:** `POST`
- **Ruta:** `/api/metrics/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "heart_rate": 75,
  "stress_level": 4,
  "activity_level": 70,
  "wearable": 1
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 51,
  "user": 1,
  "heart_rate": 75,
  "stress_level": 4,
  "activity_level": 70,
  "timestamp": "2025-11-01T16:45:00Z",
  "wearable": 1
}
```

### 4.3. Obtener Estadísticas de Métricas

**Descripción:** Obtiene estadísticas calculadas (promedio, máximo, mínimo) de las métricas en un rango de fechas.

- **Método:** `GET`
- **Ruta:** `/api/metrics/statistics/`
- **Autenticación:** Requerida
- **Parámetros de consulta:**
  - `start_date`: Fecha de inicio (formato: YYYY-MM-DD)
  - `end_date`: Fecha de fin (formato: YYYY-MM-DD)
- **Respuesta exitosa (200):**
```json
{
  "period": {
    "start": "2025-11-01",
    "end": "2025-11-07"
  },
  "heart_rate": {
    "average": 72.5,
    "min": 60,
    "max": 95
  },
  "stress_level": {
    "average": 3.2,
    "min": 1,
    "max": 7
  },
  "activity_level": {
    "average": 68.4,
    "min": 20,
    "max": 95
  }
}
```

---

## Alertas

### 5.1. Listar Alertas del Usuario

**Descripción:** Obtiene todas las alertas generadas para el usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/api/alerts/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `is_read`: Filtrar por leídas/no leídas (true/false)
  - `alert_type`: Tipo de alerta (stress, hydration, fatigue, etc)
  - `priority`: Prioridad (high, medium, low)
- **Respuesta exitosa (200):**
```json
{
  "count": 15,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": 1,
      "alert_type": "stress",
      "title": "Nivel de estrés alto",
      "message": "Tu nivel de estrés ha estado elevado en las últimas 2 horas. Te recomendamos tomar un descanso.",
      "priority": "high",
      "is_read": false,
      "created_at": "2025-11-01T14:30:00Z"
    },
    {
      "id": 2,
      "user": 1,
      "alert_type": "hydration",
      "title": "Recordatorio de hidratación",
      "message": "No has registrado consumo de agua en las últimas 3 horas.",
      "priority": "medium",
      "is_read": false,
      "created_at": "2025-11-01T15:00:00Z"
    }
  ]
}
```

### 5.2. Crear Nueva Alerta

**Descripción:** Crea una nueva alerta en el sistema (generalmente usado por procesos automáticos).

- **Método:** `POST`
- **Ruta:** `/api/alerts/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "alert_type": "fatigue",
  "title": "Señales de fatiga detectadas",
  "message": "Tus métricas indican fatiga. Considera tomar un descanso.",
  "priority": "high"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 16,
  "user": 1,
  "alert_type": "fatigue",
  "title": "Señales de fatiga detectadas",
  "message": "Tus métricas indican fatiga. Considera tomar un descanso.",
  "priority": "high",
  "is_read": false,
  "created_at": "2025-11-01T16:30:00Z"
}
```

### 5.3. Marcar Alerta como Leída

**Descripción:** Marca una alerta específica como leída.

- **Método:** `PATCH`
- **Ruta:** `/api/alerts/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la alerta
- **Cuerpo de la petición:**
```json
{
  "is_read": true
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "is_read": true,
  "message": "Alerta marcada como leída."
}
```

### 5.4. Eliminar Alerta

**Descripción:** Elimina permanentemente una alerta.

- **Método:** `DELETE`
- **Ruta:** `/api/alerts/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la alerta
- **Respuesta exitosa (204):** Sin contenido

---

## Departamentos

### 6.1. Listar Todos los Departamentos

**Descripción:** Obtiene la lista completa de departamentos registrados en la empresa.

- **Método:** `GET`
- **Ruta:** `/api/departments/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Recursos Humanos",
      "description": "Departamento de gestión de personal y talento",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Tecnología",
      "description": "Desarrollo de software y soporte técnico",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 6.2. Obtener Detalles de un Departamento

**Descripción:** Obtiene información detallada de un departamento específico, incluyendo la lista de empleados.

- **Método:** `GET`
- **Ruta:** `/api/departments/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID del departamento
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Recursos Humanos",
  "description": "Departamento de gestión de personal y talento",
  "employee_count": 12,
  "employees": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "employee_id": "EMP001"
    },
    {
      "id": 2,
      "name": "María García",
      "employee_id": "EMP002"
    }
  ]
}
```

### 6.3. Crear Nuevo Departamento

**Descripción:** Crea un nuevo departamento en el sistema (solo administradores).

- **Método:** `POST`
- **Ruta:** `/api/departments/`
- **Autenticación:** Requerida (Admin)
- **Cuerpo de la petición:**
```json
{
  "name": "Marketing",
  "description": "Departamento de marketing y comunicación"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 6,
  "name": "Marketing",
  "description": "Departamento de marketing y comunicación",
  "created_at": "2025-11-01T16:00:00Z"
}
```

### 6.4. Actualizar Departamento

**Descripción:** Actualiza la información de un departamento existente.

- **Método:** `PUT` o `PATCH`
- **Ruta:** `/api/departments/{id}/`
- **Autenticación:** Requerida (Admin)
- **Parámetros de ruta:**
  - `id`: ID del departamento
- **Cuerpo de la petición:**
```json
{
  "name": "Marketing y Ventas",
  "description": "Departamento de marketing, ventas y comunicación"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 6,
  "name": "Marketing y Ventas",
  "description": "Departamento de marketing, ventas y comunicación",
  "message": "Departamento actualizado exitosamente."
}
```

### 6.5. Eliminar Departamento

**Descripción:** Elimina un departamento del sistema (solo si no tiene empleados asignados).

- **Método:** `DELETE`
- **Ruta:** `/api/departments/{id}/`
- **Autenticación:** Requerida (Admin)
- **Parámetros de ruta:**
  - `id`: ID del departamento
- **Respuesta exitosa (204):** Sin contenido

---

## Sesiones de Trabajo

### 7.1. Listar Sesiones de Trabajo

**Descripción:** Obtiene todas las sesiones de trabajo registradas para el usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/api/work-sessions/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `start_date`: Fecha de inicio (formato: YYYY-MM-DD)
  - `end_date`: Fecha de fin (formato: YYYY-MM-DD)
  - `is_active`: Filtrar sesiones activas (true/false)
- **Respuesta exitosa (200):**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": 1,
      "start_time": "2025-11-01T08:00:00Z",
      "end_time": "2025-11-01T17:00:00Z",
      "duration_hours": 9.0,
      "break_time_minutes": 60,
      "shift_type": "morning",
      "is_active": false,
      "created_at": "2025-11-01T08:00:00Z"
    }
  ]
}
```

### 7.2. Iniciar Sesión de Trabajo

**Descripción:** Inicia una nueva sesión de trabajo para el usuario autenticado.

- **Método:** `POST`
- **Ruta:** `/api/work-sessions/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "shift_type": "morning"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 11,
  "user": 1,
  "start_time": "2025-11-02T08:00:00Z",
  "end_time": null,
  "shift_type": "morning",
  "is_active": true,
  "message": "Sesión de trabajo iniciada."
}
```

### 7.3. Finalizar Sesión de Trabajo

**Descripción:** Finaliza la sesión de trabajo activa del usuario.

- **Método:** `POST`
- **Ruta:** `/api/work-sessions/{id}/end_session/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la sesión de trabajo
- **Respuesta exitosa (200):**
```json
{
  "id": 11,
  "user": 1,
  "start_time": "2025-11-02T08:00:00Z",
  "end_time": "2025-11-02T17:00:00Z",
  "duration_hours": 9.0,
  "is_active": false,
  "message": "Sesión de trabajo finalizada."
}
```

### 7.4. Obtener Sesión Activa

**Descripción:** Obtiene la sesión de trabajo activa del usuario (si existe).

- **Método:** `GET`
- **Ruta:** `/api/work-sessions/active/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "id": 11,
  "user": 1,
  "start_time": "2025-11-02T08:00:00Z",
  "end_time": null,
  "shift_type": "morning",
  "is_active": true,
  "elapsed_hours": 3.5
}
```

### 7.5. Obtener Estadísticas de Sesiones

**Descripción:** Obtiene estadísticas sobre las sesiones de trabajo del usuario en un período específico.

- **Método:** `GET`
- **Ruta:** `/api/work-sessions/statistics/`
- **Autenticación:** Requerida
- **Parámetros de consulta:**
  - `start_date`: Fecha de inicio (formato: YYYY-MM-DD)
  - `end_date`: Fecha de fin (formato: YYYY-MM-DD)
- **Respuesta exitosa (200):**
```json
{
  "period": {
    "start": "2025-11-01",
    "end": "2025-11-07"
  },
  "total_sessions": 5,
  "total_hours_worked": 45.0,
  "average_session_hours": 9.0,
  "total_break_time_minutes": 300
}
```

---

## Tareas

### 8.1. Listar Tareas del Usuario

**Descripción:** Obtiene todas las tareas asignadas al usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/api/tasks/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `status`: Filtrar por estado (pending, in_progress, completed, cancelled)
  - `priority`: Filtrar por prioridad (low, medium, high, critical)
  - `due_date`: Filtrar por fecha de vencimiento
- **Respuesta exitosa (200):**
```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Revisar reportes mensuales",
      "description": "Revisar y aprobar los reportes del mes de octubre",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": {
        "id": 1,
        "name": "Juan Pérez"
      },
      "due_date": "2025-11-05",
      "created_at": "2025-10-28T10:00:00Z",
      "updated_at": "2025-11-01T14:00:00Z"
    }
  ]
}
```

### 8.2. Crear Nueva Tarea

**Descripción:** Crea una nueva tarea en el sistema.

- **Método:** `POST`
- **Ruta:** `/api/tasks/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "title": "Actualizar documentación",
  "description": "Actualizar la documentación técnica del proyecto",
  "priority": "medium",
  "due_date": "2025-11-10",
  "assigned_to": 1
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 9,
  "title": "Actualizar documentación",
  "description": "Actualizar la documentación técnica del proyecto",
  "status": "pending",
  "priority": "medium",
  "due_date": "2025-11-10",
  "assigned_to": 1,
  "created_at": "2025-11-01T16:30:00Z"
}
```

### 8.3. Actualizar Estado de Tarea

**Descripción:** Actualiza el estado de una tarea específica.

- **Método:** `POST`
- **Ruta:** `/api/tasks/{id}/update_status/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la tarea
- **Cuerpo de la petición:**
```json
{
  "status": "completed"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "title": "Revisar reportes mensuales",
  "status": "completed",
  "completed_at": "2025-11-01T16:45:00Z",
  "message": "Tarea marcada como completada."
}
```

### 8.4. Obtener Tareas Pendientes

**Descripción:** Obtiene todas las tareas pendientes del usuario.

- **Método:** `GET`
- **Ruta:** `/api/tasks/pending/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "count": 3,
  "results": [
    {
      "id": 2,
      "title": "Preparar presentación",
      "priority": "high",
      "due_date": "2025-11-03"
    }
  ]
}
```

### 8.5. Obtener Tareas por Prioridad

**Descripción:** Obtiene tareas del usuario agrupadas por nivel de prioridad.

- **Método:** `GET`
- **Ruta:** `/api/tasks/by_priority/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "critical": 1,
  "high": 3,
  "medium": 2,
  "low": 2,
  "tasks": [
    {
      "priority": "critical",
      "tasks": [
        {
          "id": 5,
          "title": "Resolver incidente de seguridad",
          "due_date": "2025-11-02"
        }
      ]
    }
  ]
}
```

### 8.6. Obtener Resumen de Tareas

**Descripción:** Obtiene un resumen estadístico de todas las tareas del usuario.

- **Método:** `GET`
- **Ruta:** `/api/tasks/summary/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "total": 15,
  "pending": 3,
  "in_progress": 5,
  "completed": 6,
  "cancelled": 1,
  "overdue": 2
}
```

---

## Dispositivos Wearables

### 9.1. Listar Todos los Dispositivos

**Descripción:** Obtiene la lista completa de dispositivos wearables registrados en el sistema.

- **Método:** `GET`
- **Ruta:** `/api/devices/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `brand`: Filtrar por marca
  - `status`: Filtrar por estado (active, maintenance, retired)
- **Respuesta exitosa (200):**
```json
{
  "count": 20,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "brand": "Fitbit",
      "model": "Charge 5",
      "serial_number": "FB12345678",
      "status": "active",
      "battery_level": 85,
      "last_sync": "2025-11-01T15:30:00Z",
      "created_at": "2024-06-01T00:00:00Z"
    }
  ]
}
```

### 9.2. Registrar Nuevo Dispositivo

**Descripción:** Registra un nuevo dispositivo wearable en el sistema.

- **Método:** `POST`
- **Ruta:** `/api/devices/`
- **Autenticación:** Requerida (Admin)
- **Cuerpo de la petición:**
```json
{
  "brand": "Garmin",
  "model": "Vivosmart 5",
  "serial_number": "GR87654321"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 21,
  "brand": "Garmin",
  "model": "Vivosmart 5",
  "serial_number": "GR87654321",
  "status": "active",
  "battery_level": 100,
  "created_at": "2025-11-01T16:30:00Z"
}
```

### 9.3. Obtener Dispositivos Disponibles

**Descripción:** Obtiene la lista de dispositivos que no están asignados actualmente a ningún usuario.

- **Método:** `GET`
- **Ruta:** `/api/devices/available/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "count": 5,
  "devices": [
    {
      "id": 15,
      "brand": "Fitbit",
      "model": "Charge 5",
      "serial_number": "FB99887766",
      "status": "active"
    }
  ]
}
```

### 9.4. Sincronizar Dispositivo

**Descripción:** Registra una sincronización manual de un dispositivo wearable.

- **Método:** `POST`
- **Ruta:** `/api/devices/{id}/sync/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID del dispositivo
- **Cuerpo de la petición:**
```json
{
  "battery_level": 75
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "last_sync": "2025-11-01T17:00:00Z",
  "battery_level": 75,
  "message": "Dispositivo sincronizado exitosamente."
}
```

### 9.5. Listar Asignaciones de Dispositivos

**Descripción:** Obtiene todas las asignaciones de dispositivos a usuarios.

- **Método:** `GET`
- **Ruta:** `/api/device-assignments/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `user`: Filtrar por ID de usuario
  - `is_active`: Filtrar por estado activo (true/false)
- **Respuesta exitosa (200):**
```json
{
  "count": 15,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 1,
        "name": "Juan Pérez"
      },
      "wearable": {
        "id": 1,
        "brand": "Fitbit",
        "model": "Charge 5"
      },
      "assigned_date": "2025-10-01",
      "return_date": null,
      "is_active": true
    }
  ]
}
```

### 9.6. Asignar Dispositivo a Usuario

**Descripción:** Asigna un dispositivo wearable a un usuario específico.

- **Método:** `POST`
- **Ruta:** `/api/device-assignments/`
- **Autenticación:** Requerida (Admin/Supervisor)
- **Cuerpo de la petición:**
```json
{
  "user": 2,
  "wearable": 15,
  "assigned_date": "2025-11-01"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 16,
  "user": 2,
  "wearable": 15,
  "assigned_date": "2025-11-01",
  "is_active": true,
  "message": "Dispositivo asignado exitosamente."
}
```

### 9.7. Devolver Dispositivo

**Descripción:** Registra la devolución de un dispositivo por parte de un usuario.

- **Método:** `POST`
- **Ruta:** `/api/device-assignments/{id}/return/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID de la asignación
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "return_date": "2025-11-01",
  "is_active": false,
  "message": "Dispositivo devuelto exitosamente."
}
```

### 9.8. Obtener Mi Dispositivo Asignado

**Descripción:** Obtiene el dispositivo wearable actualmente asignado al usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/api/device-assignments/my_device/`
- **Autenticación:** Requerida
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "wearable": {
    "id": 1,
    "brand": "Fitbit",
    "model": "Charge 5",
    "serial_number": "FB12345678",
    "battery_level": 85,
    "last_sync": "2025-11-01T15:30:00Z"
  },
  "assigned_date": "2025-10-01",
  "days_assigned": 31
}
```

---

## Reportes

### 10.1. Listar Reportes

**Descripción:** Obtiene todos los reportes generados en el sistema.

- **Método:** `GET`
- **Ruta:** `/api/reports/`
- **Autenticación:** Requerida
- **Parámetros de consulta opcionales:**
  - `report_type`: Tipo de reporte (daily, weekly, monthly, custom)
  - `generated_by`: ID del usuario que generó el reporte
  - `start_date`: Fecha de inicio del período del reporte
- **Respuesta exitosa (200):**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Reporte Semanal - Octubre Semana 4",
      "report_type": "weekly",
      "period_start": "2025-10-21",
      "period_end": "2025-10-27",
      "generated_by": {
        "id": 1,
        "name": "Juan Pérez"
      },
      "file_url": "/media/reports/weekly_2025_10_21.pdf",
      "created_at": "2025-10-28T09:00:00Z"
    }
  ]
}
```

### 10.2. Generar Nuevo Reporte

**Descripción:** Genera un nuevo reporte basado en los parámetros especificados.

- **Método:** `POST`
- **Ruta:** `/api/reports/generate/`
- **Autenticación:** Requerida
- **Cuerpo de la petición:**
```json
{
  "report_type": "weekly",
  "period_start": "2025-10-28",
  "period_end": "2025-11-03",
  "include_metrics": true,
  "include_goals": true,
  "include_alerts": true
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 11,
  "title": "Reporte Semanal - Octubre Semana 5",
  "report_type": "weekly",
  "period_start": "2025-10-28",
  "period_end": "2025-11-03",
  "status": "processing",
  "message": "Reporte en proceso de generación. Recibirás una notificación cuando esté listo."
}
```

### 10.3. Descargar Reporte

**Descripción:** Descarga un reporte específico en formato PDF.

- **Método:** `GET`
- **Ruta:** `/api/reports/{id}/download/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID del reporte
- **Respuesta exitosa (200):** Archivo PDF

### 10.4. Eliminar Reporte

**Descripción:** Elimina un reporte del sistema.

- **Método:** `DELETE`
- **Ruta:** `/api/reports/{id}/`
- **Autenticación:** Requerida
- **Parámetros de ruta:**
  - `id`: ID del reporte
- **Respuesta exitosa (204):** Sin contenido

---

## Notas Adicionales

### Autenticación JWT

Todos los endpoints (excepto los de autenticación) requieren un token JWT válido. El token debe incluirse en el encabezado de cada petición:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### Tokens de Acceso y Refresco

- **Access Token:** Válido por 1 hora. Se usa para autenticar cada petición.
- **Refresh Token:** Válido por 7 días. Se usa para obtener un nuevo access token cuando este expira.

### Paginación

Los endpoints que retornan listas usan paginación automática. La respuesta incluye:
- `count`: Total de resultados
- `next`: URL de la siguiente página (null si no hay más)
- `previous`: URL de la página anterior (null si es la primera)
- `results`: Array con los resultados de la página actual

### Códigos de Estado HTTP

- **200 OK:** Petición exitosa
- **201 Created:** Recurso creado exitosamente
- **204 No Content:** Petición exitosa sin contenido de respuesta
- **400 Bad Request:** Datos de entrada inválidos
- **401 Unauthorized:** Token inválido o ausente
- **403 Forbidden:** Permisos insuficientes
- **404 Not Found:** Recurso no encontrado
- **500 Internal Server Error:** Error del servidor

### Formatos de Fecha

- **Fecha:** `YYYY-MM-DD` (Ejemplo: 2025-11-01)
- **Fecha y Hora:** `YYYY-MM-DDTHH:MM:SSZ` (Ejemplo: 2025-11-01T14:30:00Z)

### Roles de Usuario

- **employee:** Usuario regular con acceso a sus propios datos
- **supervisor:** Puede ver datos de su departamento
- **admin:** Acceso completo al sistema

---

## Documentación Interactiva

Puedes explorar y probar todos los endpoints de forma interactiva usando:

- **Swagger UI:** `http://localhost:8000/swagger/`
- **ReDoc:** `http://localhost:8000/redoc/`

---

**Fecha de última actualización:** 1 de noviembre de 2025  
**Versión de la API:** 1.0
