# Lista de Endpoints - API ZZZ

A continuación se presenta una lista de todos los endpoints disponibles en la API, junto con una breve descripción de su función principal.

---

## Autenticación
- **POST /api/auth/register/**: Registrar un nuevo usuario.
- **POST /api/auth/login/**: Iniciar sesión y obtener tokens JWT.
- **POST /api/auth/logout/**: Cerrar sesión del usuario.
- **POST /api/auth/refresh/**: Refrescar el token de acceso usando el refresh token.

## Usuarios
- **GET /api/users/profile/**: Obtener el perfil del usuario autenticado.
- **PUT/PATCH /api/users/update_profile/**: Actualizar nombre y apellido del usuario.
- **PUT/PATCH /api/users/update_employee/**: Actualizar información laboral del empleado.
- **GET /api/users/**: Listar todos los usuarios (según permisos).
- **GET /api/users/{id}/**: Obtener detalles de un usuario específico.

## Metas Personales
- **GET /api/goals/**: Listar todas las metas personales del usuario.
- **POST /api/goals/**: Crear una nueva meta personal.
- **GET /api/goals/{id}/**: Obtener detalles de una meta específica.
- **PUT/PATCH /api/goals/{id}/**: Actualizar una meta existente.
- **DELETE /api/goals/{id}/**: Eliminar una meta.
- **POST /api/goals/{id}/update_progress/**: Actualizar el progreso de una meta.
- **GET /api/goals/summary/**: Obtener resumen estadístico de metas.
- **GET /api/goals/recommendations/**: Obtener recomendaciones personalizadas según el progreso de metas.

## Métricas
- **GET /api/metrics/**: Listar todas las métricas biométricas del usuario.
- **POST /api/metrics/**: Registrar una nueva métrica biométrica.
- **GET /api/metrics/statistics/**: Obtener estadísticas de métricas en un rango de fechas.

## Alertas
- **GET /api/alerts/**: Listar todas las alertas del usuario.
- **POST /api/alerts/**: Crear una nueva alerta.
- **PATCH /api/alerts/{id}/**: Marcar una alerta como leída.
- **DELETE /api/alerts/{id}/**: Eliminar una alerta.

## Departamentos
- **GET /api/departments/**: Listar todos los departamentos.
- **POST /api/departments/**: Crear un nuevo departamento.
- **GET /api/departments/{id}/**: Obtener detalles de un departamento.
- **PUT/PATCH /api/departments/{id}/**: Actualizar un departamento.
- **DELETE /api/departments/{id}/**: Eliminar un departamento.

## Sesiones de Trabajo
- **GET /api/work-sessions/**: Listar todas las sesiones de trabajo del usuario.
- **POST /api/work-sessions/**: Iniciar una nueva sesión de trabajo.
- **POST /api/work-sessions/{id}/end_session/**: Finalizar una sesión de trabajo.
- **GET /api/work-sessions/active/**: Obtener la sesión de trabajo activa.
- **GET /api/work-sessions/statistics/**: Obtener estadísticas de sesiones de trabajo.

## Tareas
- **GET /api/tasks/**: Listar todas las tareas del usuario.
- **POST /api/tasks/**: Crear una nueva tarea.
- **POST /api/tasks/{id}/update_status/**: Actualizar el estado de una tarea.
- **GET /api/tasks/pending/**: Listar tareas pendientes.
- **GET /api/tasks/by_priority/**: Listar tareas agrupadas por prioridad.
- **GET /api/tasks/summary/**: Obtener resumen estadístico de tareas.

## Dispositivos Wearables
- **GET /api/devices/**: Listar todos los dispositivos wearables.
- **POST /api/devices/**: Registrar un nuevo dispositivo.
- **GET /api/devices/available/**: Listar dispositivos disponibles para asignar.
- **POST /api/devices/{id}/sync/**: Sincronizar manualmente un dispositivo.
- **GET /api/device-assignments/**: Listar todas las asignaciones de dispositivos.
- **POST /api/device-assignments/**: Asignar un dispositivo a un usuario.
- **POST /api/device-assignments/{id}/return/**: Registrar la devolución de un dispositivo.
- **GET /api/device-assignments/my_device/**: Obtener el dispositivo asignado al usuario autenticado.

## Reportes
- **GET /api/reports/**: Listar todos los reportes generados.
- **POST /api/reports/generate/**: Generar un nuevo reporte.
- **GET /api/reports/{id}/download/**: Descargar un reporte en PDF.
- **DELETE /api/reports/{id}/**: Eliminar un reporte.

---

## ¿Cuáles endpoints son internos y cuáles externos?

- **Externos:** Son aquellos que están pensados para ser consumidos por el frontend, aplicaciones móviles, integraciones externas o usuarios finales. Ejemplo: todos los endpoints de autenticación, usuarios, metas, métricas, alertas, tareas, dispositivos, reportes.

- **Internos:** Son endpoints que solo deberían ser usados por procesos automáticos, scripts, administración interna o integraciones backend. Ejemplo: endpoints de administración, generación de reportes automáticos, sincronización de dispositivos, asignaciones masivas, endpoints de mantenimiento o debugging.

**En tu sistema, la mayoría de los endpoints son externos, ya que están diseñados para ser consumidos por la app y los usuarios. Los internos suelen ser los de administración, sincronización y generación automática de reportes.**

---

## Endpoints Externos

POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
POST /api/auth/refresh/
GET /api/users/profile/
PUT/PATCH /api/users/update_profile/
PUT/PATCH /api/users/update_employee/
GET /api/users/
GET /api/users/{id}/
GET /api/goals/
POST /api/goals/
GET /api/goals/{id}/
PUT/PATCH /api/goals/{id}/
DELETE /api/goals/{id}/
POST /api/goals/{id}/update_progress/
GET /api/goals/summary/
GET /api/goals/recommendations/
GET /api/metrics/
POST /api/metrics/
GET /api/metrics/statistics/
GET /api/alerts/
POST /api/alerts/
PATCH /api/alerts/{id}/
DELETE /api/alerts/{id}/
GET /api/departments/
POST /api/departments/
GET /api/departments/{id}/
PUT/PATCH /api/departments/{id}/
DELETE /api/departments/{id}/
GET /api/work-sessions/
POST /api/work-sessions/
POST /api/work-sessions/{id}/end_session/
GET /api/work-sessions/active/
GET /api/work-sessions/statistics/
GET /api/tasks/
POST /api/tasks/
POST /api/tasks/{id}/update_status/
GET /api/tasks/pending/
GET /api/tasks/by_priority/
GET /api/tasks/summary/
GET /api/devices/
POST /api/devices/
GET /api/devices/available/
POST /api/devices/{id}/sync/
GET /api/device-assignments/
POST /api/device-assignments/
POST /api/device-assignments/{id}/return/
GET /api/device-assignments/my_device/
GET /api/reports/
POST /api/reports/generate/
GET /api/reports/{id}/download/
DELETE /api/reports/{id}/

## Endpoints Internos

POST /api/reports/generate/
POST /api/devices/{id}/sync/
POST /api/device-assignments/
POST /api/device-assignments/{id}/return/
POST /api/tasks/{id}/update_status/
POST /api/goals/{id}/update_progress/
