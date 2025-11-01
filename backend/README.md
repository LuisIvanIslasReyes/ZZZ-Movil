# ZZZ Backend - Sistema de Monitoreo de Fatiga y Bienestar# ZZZ Backend - Django Rest Framework



Backend profesional construido con Django Rest Framework para el sistema ZZZ (Zero to Zero-Fatigue Zone).Backend modular y profesional para el sistema Zero to Zero-Fatigue Zone (ZZZ).



## 🚀 Características## 📁 Estructura Modular



- **Arquitectura Modular**: Estructura profesional con apps independientes```

- **Autenticación JWT**: Tokens seguros con refresh automáticobackend/

- **API RESTful**: Endpoints completos y documentados├── users/              # Gestión de usuarios y autenticación

- **Documentación Swagger**: Interfaz interactiva en `/docs/`├── metrics/            # Métricas fisiológicas

- **PostgreSQL**: Base de datos robusta y escalable├── alerts/             # Sistema de alertas

- **Seguridad**: Configuraciones por ambiente (local/production)├── goals/              # Metas personales

└── zzz_backend/        # Configuración principal del proyecto

## 📁 Estructura del Proyecto```



```## 🚀 Instalación y Configuración

backend/

├── apps/                          # Apps modulares### 1. Crear entorno virtual

│   ├── users/                    # Autenticación y perfiles

│   ├── departments/              # Gestión de departamentos```bash

│   ├── metrics/                  # Métricas fisiológicaspython -m venv venv

│   ├── alerts/                   # Sistema de alertas```

│   ├── goals/                    # Metas personales

│   ├── work_sessions/            # Sesiones de trabajo (turnos)### 2. Activar entorno virtual

│   ├── tasks/                    # Gestión de tareas

│   ├── wearables/                # Dispositivos wearables**Windows (PowerShell):**

│   └── reports/                  # Reportes y análisis```powershell

├── config/                        # Configuración Django.\venv\Scripts\Activate.ps1

│   ├── settings/                 # Settings por ambiente```

│   │   ├── base.py              # Configuración común

│   │   ├── local.py             # Desarrollo**Windows (CMD):**

│   │   └── production.py        # Producción```cmd

│   ├── urls.py                   # Rutas principalesvenv\Scripts\activate.bat

│   ├── wsgi.py                   # WSGI```

│   └── asgi.py                   # ASGI

├── backups/                       # Respaldos de BD**Linux/Mac:**

├── docs/                          # Documentación adicional```bash

├── manage.py                      # CLI de Djangosource venv/bin/activate

├── requirements.txt               # Dependencias```

├── .env.example                   # Template de variables

└── README.md                      # Este archivo### 3. Instalar dependencias

```

```bash

## 🛠️ Instalación y Configuraciónpip install -r requirements.txt

```

### 1. Requisitos Previos

### 4. Aplicar migraciones

- Python 3.11+

- PostgreSQL 12+```bash

- pippython manage.py makemigrations

python manage.py migrate

### 2. Clonar el Repositorio```



```bash### 5. Crear superusuario

git clone https://github.com/LuisIvanIslasReyes/ZZZ-Movil.git

cd ZZZ-Movil/backend```bash

```python manage.py createsuperuser

```

### 3. Instalar Dependencias

### 6. Ejecutar servidor de desarrollo

```bash

pip install -r requirements.txt```bash

```python manage.py runserver

```

### 4. Configurar Variables de Entorno

El servidor estará disponible en: `http://127.0.0.1:8000/`

Copia `.env.example` a `.env` y configura:

## 📊 Endpoints Disponibles

```env

# Base de datos PostgreSQL### Autenticación

DB_NAME=ZZZ- **POST** `/api/auth/login/` - Iniciar sesión (retorna JWT tokens)

DB_USER=postgres

DB_PASSWORD=          # Dejar vacío si no tiene password### Usuarios

DB_HOST=localhost- **GET** `/api/users/profile/` - Obtener perfil del usuario autenticado

DB_PORT=5432- **PUT** `/api/users/update_profile/` - Actualizar perfil (solo nombre)

- **POST** `/api/users/logout/` - Cerrar sesión

# Django

SECRET_KEY=tu-secret-key-aqui## 🔐 Autenticación JWT

DEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1El sistema usa JWT (JSON Web Tokens) para autenticación. 



# CORS (para desarrollo)### Cómo usar:

CORS_ALLOW_ALL_ORIGINS=True

```1. **Login**: Envía POST a `/api/auth/login/` con:

```json

**Nota sobre PostgreSQL sin contraseña:**{

Si tu PostgreSQL no tiene contraseña configurada, simplemente deja `DB_PASSWORD=` vacío. El sistema está configurado para soportar ambos casos.  "username": "tu_usuario",

  "password": "tu_contraseña"

### 5. Crear Base de Datos}

```

En PostgreSQL:

2. **Respuesta**:

```sql```json

CREATE DATABASE ZZZ;{

```  "refresh": "token_de_refresco",

  "access": "token_de_acceso",

### 6. Ejecutar Migraciones  "user": {

    "id": 1,

```bash    "username": "usuario",

python manage.py makemigrations    "email": "email@example.com",

python manage.py migrate    ...

```  }

}

### 7. Crear Superusuario```



```bash3. **Usar el token**: En las siguientes peticiones, incluye el header:

python manage.py createsuperuser```

```Authorization: Bearer {access_token}

```

### 8. Ejecutar Servidor de Desarrollo

## 🧪 Probar con Postman/Thunder Client

```bash

python manage.py runserver1. Login: POST `http://127.0.0.1:8000/api/auth/login/`

```2. Copiar el `access` token de la respuesta

3. Para endpoints protegidos, agregar header:

El servidor estará disponible en: `http://localhost:8000`   - Key: `Authorization`

   - Value: `Bearer {tu_access_token}`

## 📚 Documentación de API

## 📱 Integración con React Native

Una vez que el servidor esté corriendo, accede a:

En tu app móvil, guarda el token después del login y úsalo en todas las peticiones:

- **Swagger UI**: http://localhost:8000/docs/

- **ReDoc**: http://localhost:8000/redoc/```javascript

- **Admin Panel**: http://localhost:8000/admin/const token = 'tu_access_token';



## 🔐 Autenticaciónfetch('http://127.0.0.1:8000/api/users/profile/', {

  headers: {

### Obtener Token JWT    'Authorization': `Bearer ${token}`,

    'Content-Type': 'application/json',

```http  }

POST /api/v1/auth/login/})

Content-Type: application/json```



{## 🛠️ Comandos Útiles

  "email": "usuario@example.com",

  "password": "password123"```bash

}# Crear migraciones después de cambios en modelos

```python manage.py makemigrations



**Respuesta:**# Aplicar migraciones

```jsonpython manage.py migrate

{

  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",# Crear datos de prueba (shell interactivo)

  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",python manage.py shell

  "user": {

    "id": 1,# Acceder al admin

    "username": "usuario",# http://127.0.0.1:8000/admin/

    "email": "usuario@example.com",```

    "role": "employee"

  }## 📦 Próximos Módulos

}

```- [ ] Endpoints para métricas (HomeScreen)

- [ ] Endpoints para alertas (AlertsScreen)

### Usar Token en Peticiones- [ ] Endpoints para metas (GoalsScreen)

- [ ] WebSockets para alertas en tiempo real

```http- [ ] Módulo de Machine Learning para recomendaciones

GET /api/v1/metrics/today/

Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...## 🎯 Características Implementadas

```

✅ Estructura modular profesional

## 📡 Endpoints Principales✅ Autenticación JWT segura

✅ Login y perfil de usuario

### Autenticación✅ CORS configurado para React Native

- `POST /api/v1/auth/login/` - Iniciar sesión✅ Modelos para usuarios, métricas, alertas y metas

- `POST /api/v1/auth/logout/` - Cerrar sesión✅ Panel de administración de Django



### Usuarios## 📝 Notas

- `GET /api/v1/users/profile/` - Obtener perfil del usuario

- `PUT /api/v1/users/update_profile/` - Actualizar perfil- El token de acceso expira en 12 horas

- `PATCH /api/v1/users/notification_settings/` - Configurar notificaciones- El token de refresco expira en 7 días

- `POST /api/v1/users/change_password/` - Cambiar contraseña- Cambia el `SECRET_KEY` en producción

- Configura variables de entorno para producción

### Métricas
- `GET /api/v1/metrics/` - Listar todas las métricas
- `GET /api/v1/metrics/today/` - Métricas del día (con comparación vs ayer)
- `GET /api/v1/metrics/trends/?period=week` - Tendencias (day/week/month)
- `GET /api/v1/metrics/recovery_analysis/` - Análisis de recuperación

### Alertas
- `GET /api/v1/alerts/` - Listar alertas
- `POST /api/v1/alerts/{id}/mark_read/` - Marcar como leída
- `POST /api/v1/alerts/mark_all_read/` - Marcar todas como leídas
- `GET /api/v1/alerts/summary/` - Resumen del día
- `GET /api/v1/alerts/recommendations/` - Recomendaciones de IA

### Metas
- `GET /api/v1/goals/` - Listar metas
- `POST /api/v1/goals/` - Crear nueva meta
- `POST /api/v1/goals/{id}/update_progress/` - Actualizar progreso
- `GET /api/v1/goals/summary/` - Resumen de metas
- `GET /api/v1/goals/recommendations/` - Recomendaciones personalizadas

### Sesiones de Trabajo
- `GET /api/v1/work-sessions/` - Listar sesiones
- `GET /api/v1/work-sessions/current/` - Sesión activa actual
- `POST /api/v1/work-sessions/{id}/end_session/` - Finalizar sesión
- `GET /api/v1/work-sessions/summary/` - Resumen de sesiones

### Tareas
- `GET /api/v1/tasks/` - Listar tareas
- `GET /api/v1/tasks/pending/` - Tareas pendientes
- `POST /api/v1/tasks/{id}/complete/` - Completar tarea
- `GET /api/v1/tasks/summary/` - Resumen de tareas
- `GET /api/v1/tasks/high_risk/` - Tareas de alto riesgo de fatiga

### Wearables
- `GET /api/v1/wearables/` - Listar dispositivos
- `GET /api/v1/wearables/available/` - Dispositivos disponibles
- `POST /api/v1/wearables/{id}/sync/` - Sincronizar dispositivo
- `GET /api/v1/wearable-assignments/my_wearable/` - Mi wearable asignado

### Reportes
- `POST /api/v1/reports/generate/` - Generar nuevo reporte
- `GET /api/v1/reports/` - Listar reportes generados

## 🏗️ Modelos de Datos

### User
- **Rol**: `employee`, `supervisor`, `admin`
- **Campos**: employee_id, email, role, department, location, hire_date
- **Notificaciones**: fatigue_alerts, health_alerts, goal_reminders, system_notifications

### Metric
- **Campos fisiológicos**: heart_rate, hrv, spo2, steps, activity_level, movement
- **Campos calculados**: stress_level, fatigue_level, recovery_score
- **Relaciones**: user, wearable, work_session, task

### Alert
- **Tipos**: fatigue, health, productivity, safety
- **Niveles**: low, medium, high, critical
- **Estados**: read/unread

### Goal
- **Categorías**: steps, heart_rate, recovery, stress, activity, hrv, sleep, productivity
- **Progreso**: current_progress, target, progress_percentage

### WorkSession
- **Turnos**: morning, afternoon, night, custom
- **Intervalos**: break, meal, rest (pausas dentro del turno)

### Task
- **Prioridad**: low, medium, high, critical
- **Riesgo de fatiga**: low, medium, high
- **Duración**: estimated_duration, actual_duration

### Wearable
- **Estado**: active, inactive, maintenance, damaged
- **Datos técnicos**: serial_number, model, manufacturer, firmware_version, battery_level

### Report
- **Tipos**: individual, department, company, fatigue, productivity
- **Contenido**: JSON con datos analíticos personalizados

## 🔧 Configuración Avanzada

### Settings por Ambiente

El proyecto usa configuración modular:

- **base.py**: Configuración común a todos los ambientes
- **local.py**: Desarrollo (DEBUG=True, CORS abierto)
- **production.py**: Producción (seguridad reforzada, SSL)

Para cambiar el ambiente, modifica `manage.py`:

```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
# o
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
```

### JWT Tokens

Configuración actual:
- **Access Token**: 12 horas
- **Refresh Token**: 7 días
- **Algoritmo**: HS256

Para cambiar, edita `config/settings/base.py`:

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=12),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    # ... más opciones
}
```

### Paginación

Por defecto: 50 items por página. Para cambiar:

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100  # Cambia aquí
}
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
python manage.py test

# Test de una app específica
python manage.py test apps.users

# Con cobertura
coverage run --source='.' manage.py test
coverage report
```

## 📦 Respaldos

### Crear Respaldo

```bash
pg_dump -U postgres ZZZ > backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar Respaldo

```bash
psql -U postgres ZZZ < backups/backup_20241031_120000.sql
```

## 🐛 Troubleshooting

### Error: "No module named 'drf_yasg'"
```bash
pip install -r requirements.txt
```

### Error: "django.db.utils.OperationalError: FATAL: password authentication failed"
Verifica tu archivo `.env` y que PostgreSQL esté corriendo:
```bash
# Windows
net start postgresql-x64-XX

# Linux/Mac
sudo service postgresql start
```

### Error: "Port 8000 is already in use"
```bash
# Ver proceso usando el puerto
netstat -ano | findstr :8000

# Matar el proceso
taskkill /PID <PID> /F
```

## 📈 Producción

Para desplegar en producción:

1. **Cambiar a settings de producción**
2. **Configurar variables de entorno reales**
3. **Usar servidor WSGI/ASGI** (Gunicorn, uWSGI)
4. **Configurar HTTPS/SSL**
5. **Usar proxy reverso** (Nginx)
6. **Configurar respaldos automáticos**

Ejemplo con Gunicorn:

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del sistema ZZZ (Zero to Zero-Fatigue Zone) desarrollado para monitoreo de fatiga y bienestar laboral.

## 👥 Equipo

- **Repositorio**: https://github.com/LuisIvanIslasReyes/ZZZ-Movil
- **Backend**: Django Rest Framework 3.15.2
- **Frontend**: React Native (ver carpeta `/zzzapp`)

## 📞 Soporte

Para dudas o soporte, contacta al equipo de desarrollo.

---

**¡Bienvenido al sistema ZZZ! 🚀**
