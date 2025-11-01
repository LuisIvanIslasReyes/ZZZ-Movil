# ZZZ Backend - Sistema de Monitoreo de Fatiga y Bienestar# ZZZ Backend - Sistema de Monitoreo de Fatiga y Bienestar



Backend profesional construido con Django Rest Framework para el sistema ZZZ (Zero to Zero-Fatigue Zone).Backend profesional construido con Django Rest Framework para el sistema ZZZ (Zero to Zero-Fatigue Zone).



## 🚀 Características## 🚀 Características



- **Arquitectura Modular**: Estructura profesional con apps independientes- **Arquitectura Modular**: Estructura profesional con apps independientes

- **Autenticación JWT**: Tokens seguros con refresh automático  - **Autenticación JWT**: Tokens seguros con refresh automático

- **API RESTful**: Endpoints completos y documentados- **API RESTful**: Endpoints completos y documentados

- **Documentación Swagger**: Interfaz interactiva en `/docs/`- **Documentación Swagger**: Interfaz interactiva en `/docs/`

- **PostgreSQL**: Base de datos robusta y escalable- **PostgreSQL**: Base de datos robusta y escalable

- **Seguridad**: Configuraciones por ambiente (local/production)- **Seguridad**: Configuraciones por ambiente (local/production)



## 📁 Estructura del Proyecto## 📁 Estructura del Proyecto



``````

backend/backend/

├── apps/                      # Apps modulares├── apps/                          # Apps modulares

│   ├── users/                # Autenticación y perfiles│   ├── users/                    # Autenticación y perfiles

│   ├── departments/          # Gestión de departamentos│   ├── departments/              # Gestión de departamentos

│   ├── metrics/              # Métricas fisiológicas│   ├── metrics/                  # Métricas fisiológicas

│   ├── alerts/               # Sistema de alertas│   ├── alerts/                   # Sistema de alertas

│   ├── goals/                # Metas personales│   ├── goals/                    # Metas personales

│   ├── work_sessions/        # Sesiones de trabajo (turnos)│   ├── work_sessions/            # Sesiones de trabajo (turnos)

│   ├── tasks/                # Gestión de tareas│   ├── tasks/                    # Gestión de tareas

│   ├── wearables/            # Dispositivos wearables│   ├── wearables/                # Dispositivos wearables

│   └── reports/              # Reportes y análisis│   └── reports/                  # Reportes y análisis

├── config/                    # Configuración Django├── config/                        # Configuración Django

│   ├── settings/             # Settings por ambiente│   ├── settings/                 # Settings por ambiente

│   │   ├── base.py          # Configuración común│   │   ├── base.py              # Configuración común

│   │   ├── local.py         # Desarrollo│   │   ├── local.py             # Desarrollo

│   │   └── production.py    # Producción│   │   └── production.py        # Producción

│   ├── urls.py               # Rutas principales│   ├── urls.py                   # Rutas principales

│   ├── wsgi.py               # WSGI│   ├── wsgi.py                   # WSGI

│   └── asgi.py               # ASGI│   └── asgi.py                   # ASGI

├── backups/                   # Respaldos de BD├── backups/                       # Respaldos de BD

├── docs/                      # Documentación adicional├── docs/                          # Documentación adicional

├── manage.py                  # CLI de Django├── manage.py                      # CLI de Django

├── requirements.txt           # Dependencias├── requirements.txt               # Dependencias

├── .env.example               # Template de variables├── .env.example                   # Template de variables

└── README.md                  # Este archivo└── README.md                      # Este archivo

``````



## 🛠️ Instalación y Configuración│   ├── wearables/                # Dispositivos wearables**Windows (PowerShell):**



### 1. Requisitos Previos│   └── reports/                  # Reportes y análisis```powershell



- Python 3.11+├── config/                        # Configuración Django.\venv\Scripts\Activate.ps1

- PostgreSQL 12+

- pip│   ├── settings/                 # Settings por ambiente```



### 2. Clonar el Repositorio│   │   ├── base.py              # Configuración común



```bash│   │   ├── local.py             # Desarrollo**Windows (CMD):**

git clone https://github.com/LuisIvanIslasReyes/ZZZ-Movil.git

cd ZZZ-Movil/backend│   │   └── production.py        # Producción```cmd

```

│   ├── urls.py                   # Rutas principalesvenv\Scripts\activate.bat

### 3. Instalar Dependencias

│   ├── wsgi.py                   # WSGI```

```bash

pip install -r requirements.txt│   └── asgi.py                   # ASGI

```

├── backups/                       # Respaldos de BD**Linux/Mac:**

### 4. Configurar Variables de Entorno

├── docs/                          # Documentación adicional```bash

Copia `.env.example` a `.env` y configura:

├── manage.py                      # CLI de Djangosource venv/bin/activate

```env

# Base de datos PostgreSQL├── requirements.txt               # Dependencias```

DB_NAME=ZZZ

DB_USER=postgres├── .env.example                   # Template de variables

DB_PASSWORD=          # Dejar vacío si no tiene password

DB_HOST=localhost└── README.md                      # Este archivo### 3. Instalar dependencias

DB_PORT=5432

```

# Django

SECRET_KEY=tu-secret-key-aqui```bash

DEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1## 🛠️ Instalación y Configuraciónpip install -r requirements.txt



# CORS (para desarrollo)```

CORS_ALLOW_ALL_ORIGINS=True

```### 1. Requisitos Previos



**Nota:** Si tu PostgreSQL no tiene contraseña, simplemente deja `DB_PASSWORD=` vacío.### 4. Aplicar migraciones



### 5. Crear Base de Datos- Python 3.11+



En PostgreSQL:- PostgreSQL 12+```bash



```sql- pippython manage.py makemigrations

CREATE DATABASE ZZZ;

```python manage.py migrate



### 6. Ejecutar Migraciones### 2. Clonar el Repositorio```



```bash

python manage.py makemigrations

python manage.py migrate```bash### 5. Crear superusuario

```

git clone https://github.com/LuisIvanIslasReyes/ZZZ-Movil.git

### 7. Crear Superusuario

cd ZZZ-Movil/backend```bash

```bash

python manage.py createsuperuser```python manage.py createsuperuser

```

```

### 8. Ejecutar Servidor de Desarrollo

### 3. Instalar Dependencias

```bash

python manage.py runserver### 6. Ejecutar servidor de desarrollo

```

```bash

El servidor estará disponible en: `http://localhost:8000`

pip install -r requirements.txt```bash

## 📚 Documentación de API

```python manage.py runserver

Una vez que el servidor esté corriendo, accede a:

```

- **Swagger UI**: http://localhost:8000/docs/

- **ReDoc**: http://localhost:8000/redoc/### 4. Configurar Variables de Entorno

- **Admin Panel**: http://localhost:8000/admin/

El servidor estará disponible en: `http://127.0.0.1:8000/`

## 🔐 Autenticación

Copia `.env.example` a `.env` y configura:

### Obtener Token JWT

## 📊 Endpoints Disponibles

```http

POST /api/auth/login/```env

Content-Type: application/json

# Base de datos PostgreSQL### Autenticación

{

  "username": "usuario@example.com",DB_NAME=ZZZ- **POST** `/api/auth/login/` - Iniciar sesión (retorna JWT tokens)

  "password": "password123"

}DB_USER=postgres

```

DB_PASSWORD=          # Dejar vacío si no tiene password### Usuarios

**Respuesta:**

```jsonDB_HOST=localhost- **GET** `/api/users/profile/` - Obtener perfil del usuario autenticado

{

  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",DB_PORT=5432- **PUT** `/api/users/update_profile/` - Actualizar perfil (solo nombre)

  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",

  "user": {- **POST** `/api/users/logout/` - Cerrar sesión

    "id": 1,

    "username": "usuario",# Django

    "email": "usuario@example.com",

    "role": "employee"SECRET_KEY=tu-secret-key-aqui## 🔐 Autenticación JWT

  }

}DEBUG=True

```

ALLOWED_HOSTS=localhost,127.0.0.1El sistema usa JWT (JSON Web Tokens) para autenticación. 

### Usar Token en Peticiones



```http

GET /api/metrics/today/# CORS (para desarrollo)### Cómo usar:

Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

```CORS_ALLOW_ALL_ORIGINS=True



### Refrescar Token```1. **Login**: Envía POST a `/api/auth/login/` con:



```http```json

POST /api/auth/refresh/

Content-Type: application/json**Nota sobre PostgreSQL sin contraseña:**{



{Si tu PostgreSQL no tiene contraseña configurada, simplemente deja `DB_PASSWORD=` vacío. El sistema está configurado para soportar ambos casos.  "username": "tu_usuario",

  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."

}  "password": "tu_contraseña"

```

### 5. Crear Base de Datos}

## 📡 Endpoints Principales

```

### Autenticación (/api/auth/)

- `POST /register/` - Registro de usuarioEn PostgreSQL:

- `POST /login/` - Iniciar sesión

- `POST /logout/` - Cerrar sesión2. **Respuesta**:

- `POST /refresh/` - Refrescar access token

- `GET /profile/` - Perfil del usuario```sql```json



### Usuarios (/api/users/)CREATE DATABASE ZZZ;{

- `GET /employees/` - Listar empleados

- `GET /{id}/` - Detalle de empleado```  "refresh": "token_de_refresco",

- `PUT /update_profile/` - Actualizar perfil

- `POST /change_password/` - Cambiar contraseña  "access": "token_de_acceso",

- `POST /fcm_token/` - Actualizar FCM token

- `PATCH /notification_settings/` - Configurar notificaciones### 6. Ejecutar Migraciones  "user": {



### Métricas (/api/metrics/)    "id": 1,

- `GET /` - Listar todas las métricas

- `GET /today/` - Métricas del día (con comparación vs ayer)```bash    "username": "usuario",

- `GET /trends/?period=week` - Tendencias (day/week/month)

- `GET /recovery_analysis/` - Análisis de recuperaciónpython manage.py makemigrations    "email": "email@example.com",



### Alertas (/api/alerts/)python manage.py migrate    ...

- `GET /` - Listar alertas

- `POST /{id}/mark_read/` - Marcar como leída```  }

- `POST /mark_all_read/` - Marcar todas como leídas

- `GET /summary/` - Resumen del día}

- `GET /recommendations/` - Recomendaciones de IA

### 7. Crear Superusuario```

### Metas (/api/goals/)

- `GET /` - Listar metas

- `POST /` - Crear nueva meta

- `POST /{id}/update_progress/` - Actualizar progreso```bash3. **Usar el token**: En las siguientes peticiones, incluye el header:

- `GET /summary/` - Resumen de metas

- `GET /recommendations/` - Recomendaciones personalizadaspython manage.py createsuperuser```



### Sesiones de Trabajo (/api/work-sessions/)```Authorization: Bearer {access_token}

- `GET /` - Listar sesiones

- `GET /current/` - Sesión activa actual```

- `POST /{id}/end_session/` - Finalizar sesión

- `GET /summary/` - Resumen de sesiones### 8. Ejecutar Servidor de Desarrollo



### Tareas (/api/tasks/)## 🧪 Probar con Postman/Thunder Client

- `GET /` - Listar tareas

- `GET /pending/` - Tareas pendientes```bash

- `POST /{id}/complete/` - Completar tarea

- `GET /summary/` - Resumen de tareaspython manage.py runserver1. Login: POST `http://127.0.0.1:8000/api/auth/login/`

- `GET /high_risk/` - Tareas de alto riesgo de fatiga

```2. Copiar el `access` token de la respuesta

### Dispositivos (/api/devices/)

- `GET /` - Listar dispositivos wearables3. Para endpoints protegidos, agregar header:

- `POST /` - Crear dispositivo

- `GET /available/` - Dispositivos disponiblesEl servidor estará disponible en: `http://localhost:8000`   - Key: `Authorization`

- `POST /{id}/sync/` - Sincronizar dispositivo

- `GET /summary/` - Resumen de dispositivos   - Value: `Bearer {tu_access_token}`



### Asignaciones de Dispositivos (/api/device-assignments/)## 📚 Documentación de API

- `GET /` - Listar asignaciones

- `GET /my_wearable/` - Mi dispositivo asignado## 📱 Integración con React Native

- `POST /{id}/return_device/` - Devolver dispositivo

Una vez que el servidor esté corriendo, accede a:

### Reportes (/api/reports/)

- `POST /generate/` - Generar nuevo reporteEn tu app móvil, guarda el token después del login y úsalo en todas las peticiones:

- `GET /` - Listar reportes generados

- **Swagger UI**: http://localhost:8000/docs/

## 🏗️ Modelos de Datos

- **ReDoc**: http://localhost:8000/redoc/```javascript

### User

- **Rol**: `employee`, `supervisor`, `admin`- **Admin Panel**: http://localhost:8000/admin/const token = 'tu_access_token';

- **Campos**: employee_id, email, role, department, location, hire_date

- **Notificaciones**: fatigue_alerts, health_alerts, goal_reminders, system_notifications



### Metric## 🔐 Autenticaciónfetch('http://127.0.0.1:8000/api/users/profile/', {

- **Campos fisiológicos**: heart_rate, hrv, spo2, steps, activity_level, movement

- **Campos calculados**: stress_level, fatigue_level, recovery_score  headers: {

- **Relaciones**: user, wearable, work_session, task

### Obtener Token JWT    'Authorization': `Bearer ${token}`,

### Alert

- **Tipos**: fatigue, health, productivity, safety    'Content-Type': 'application/json',

- **Niveles**: low, medium, high, critical

- **Estados**: read/unread```http  }



### GoalPOST /api/v1/auth/login/})

- **Categorías**: steps, heart_rate, recovery, stress, activity, hrv, sleep, productivity

- **Progreso**: current_progress, target, progress_percentageContent-Type: application/json```



### WorkSession

- **Turnos**: morning, afternoon, night, custom

- **Intervalos**: break, meal, rest (pausas dentro del turno){## 🛠️ Comandos Útiles



### Task  "email": "usuario@example.com",

- **Prioridad**: low, medium, high, critical

- **Riesgo de fatiga**: low, medium, high  "password": "password123"```bash

- **Duración**: estimated_duration, actual_duration

}# Crear migraciones después de cambios en modelos

### Wearable

- **Estado**: active, inactive, maintenance, damaged```python manage.py makemigrations

- **Datos técnicos**: serial_number, model, manufacturer, firmware_version, battery_level



### Report

- **Tipos**: individual, department, company, fatigue, productivity**Respuesta:**# Aplicar migraciones

- **Contenido**: JSON con datos analíticos personalizados

```jsonpython manage.py migrate

## 🔧 Configuración Avanzada

{

### Settings por Ambiente

  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",# Crear datos de prueba (shell interactivo)

El proyecto usa configuración modular:

  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",python manage.py shell

- **base.py**: Configuración común a todos los ambientes

- **local.py**: Desarrollo (DEBUG=True, CORS abierto)  "user": {

- **production.py**: Producción (seguridad reforzada, SSL)

    "id": 1,# Acceder al admin

Para cambiar el ambiente, modifica `manage.py`:

    "username": "usuario",# http://127.0.0.1:8000/admin/

```python

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')    "email": "usuario@example.com",```

# o

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')    "role": "employee"

```

  }## 📦 Próximos Módulos

### JWT Tokens

}

Configuración actual:

- **Access Token**: 12 horas```- [ ] Endpoints para métricas (HomeScreen)

- **Refresh Token**: 7 días

- **Algoritmo**: HS256- [ ] Endpoints para alertas (AlertsScreen)



Para cambiar, edita `config/settings/base.py`:### Usar Token en Peticiones- [ ] Endpoints para metas (GoalsScreen)



```python- [ ] WebSockets para alertas en tiempo real

SIMPLE_JWT = {

    'ACCESS_TOKEN_LIFETIME': timedelta(hours=12),```http- [ ] Módulo de Machine Learning para recomendaciones

    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),

    # ... más opcionesGET /api/v1/metrics/today/

}

```Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...## 🎯 Características Implementadas



### Paginación```



Por defecto: 50 items por página. Para cambiar:✅ Estructura modular profesional



```python## 📡 Endpoints Principales✅ Autenticación JWT segura

REST_FRAMEWORK = {

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',✅ Login y perfil de usuario

    'PAGE_SIZE': 100  # Cambia aquí

}### Autenticación✅ CORS configurado para React Native

```

- `POST /api/v1/auth/login/` - Iniciar sesión✅ Modelos para usuarios, métricas, alertas y metas

## 📦 Respaldos

- `POST /api/v1/auth/logout/` - Cerrar sesión✅ Panel de administración de Django

### Crear Respaldo



```bash

pg_dump -U postgres ZZZ > backups/backup_$(date +%Y%m%d_%H%M%S).sql### Usuarios## 📝 Notas

```

- `GET /api/v1/users/profile/` - Obtener perfil del usuario

### Restaurar Respaldo

- `PUT /api/v1/users/update_profile/` - Actualizar perfil- El token de acceso expira en 12 horas

```bash

psql -U postgres ZZZ < backups/backup_20241031_120000.sql- `PATCH /api/v1/users/notification_settings/` - Configurar notificaciones- El token de refresco expira en 7 días

```

- `POST /api/v1/users/change_password/` - Cambiar contraseña- Cambia el `SECRET_KEY` en producción

## 🐛 Troubleshooting

- Configura variables de entorno para producción

### Error: "No module named 'drf_yasg'"

```bash### Métricas

pip install -r requirements.txt- `GET /api/v1/metrics/` - Listar todas las métricas

```- `GET /api/v1/metrics/today/` - Métricas del día (con comparación vs ayer)

- `GET /api/v1/metrics/trends/?period=week` - Tendencias (day/week/month)

### Error: "django.db.utils.OperationalError: FATAL: password authentication failed"- `GET /api/v1/metrics/recovery_analysis/` - Análisis de recuperación

Verifica tu archivo `.env` y que PostgreSQL esté corriendo.

### Alertas

### Error: "Port 8000 is already in use"- `GET /api/v1/alerts/` - Listar alertas

```bash- `POST /api/v1/alerts/{id}/mark_read/` - Marcar como leída

# Ver proceso usando el puerto- `POST /api/v1/alerts/mark_all_read/` - Marcar todas como leídas

netstat -ano | findstr :8000- `GET /api/v1/alerts/summary/` - Resumen del día

- `GET /api/v1/alerts/recommendations/` - Recomendaciones de IA

# Matar el proceso

taskkill /PID <PID> /F### Metas

```- `GET /api/v1/goals/` - Listar metas

- `POST /api/v1/goals/` - Crear nueva meta

## 📈 Producción- `POST /api/v1/goals/{id}/update_progress/` - Actualizar progreso

- `GET /api/v1/goals/summary/` - Resumen de metas

Para desplegar en producción:- `GET /api/v1/goals/recommendations/` - Recomendaciones personalizadas



1. Cambiar a settings de producción### Sesiones de Trabajo

2. Configurar variables de entorno reales- `GET /api/v1/work-sessions/` - Listar sesiones

3. Usar servidor WSGI/ASGI (Gunicorn, uWSGI)- `GET /api/v1/work-sessions/current/` - Sesión activa actual

4. Configurar HTTPS/SSL- `POST /api/v1/work-sessions/{id}/end_session/` - Finalizar sesión

5. Usar proxy reverso (Nginx)- `GET /api/v1/work-sessions/summary/` - Resumen de sesiones

6. Configurar respaldos automáticos

### Tareas

Ejemplo con Gunicorn:- `GET /api/v1/tasks/` - Listar tareas

- `GET /api/v1/tasks/pending/` - Tareas pendientes

```bash- `POST /api/v1/tasks/{id}/complete/` - Completar tarea

gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4- `GET /api/v1/tasks/summary/` - Resumen de tareas

```- `GET /api/v1/tasks/high_risk/` - Tareas de alto riesgo de fatiga



## 📄 Licencia### Wearables

- `GET /api/v1/wearables/` - Listar dispositivos

Este proyecto es parte del sistema ZZZ (Zero to Zero-Fatigue Zone) desarrollado para monitoreo de fatiga y bienestar laboral.- `GET /api/v1/wearables/available/` - Dispositivos disponibles

- `POST /api/v1/wearables/{id}/sync/` - Sincronizar dispositivo

## 👥 Equipo- `GET /api/v1/wearable-assignments/my_wearable/` - Mi wearable asignado



- **Repositorio**: https://github.com/LuisIvanIslasReyes/ZZZ-Movil### Reportes

- **Backend**: Django Rest Framework 3.15.2- `POST /api/v1/reports/generate/` - Generar nuevo reporte

- **Frontend**: React Native (ver carpeta `/zzzapp`)- `GET /api/v1/reports/` - Listar reportes generados



---## 🏗️ Modelos de Datos



**¡Bienvenido al sistema ZZZ! 🚀**### User

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
