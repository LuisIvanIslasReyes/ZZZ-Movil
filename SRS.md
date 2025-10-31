# Software Requirements Specification (SRS)
## Nombre del Proyecto: Zero to Zero-Fatigue Zone

**Universidad Tecnológica de Tijuana**

**Presentado por:**
* Bautista Ordoñez Brian Ángel
* Garcia Valenzuela Ernesto
* Islas Reyes Luis Ivan
* Orrantia González Germán Sisac

**Fecha:** 19 de septiembre del 2025

---

# 1. Introducción

## 1.1 Propósito
El propósito de este documento es definir los requisitos funcionales y no funcionales del sistema Zero to Zero-Fatigue Zone (ZZZ). Este sistema busca detectar y analizar la fatiga de los empleados en sus puestos de trabajo, relacionándola con tareas específicas, con el fin de optimizar la productividad, prevenir riesgos laborales y mejorar el bienestar de los trabajadores.

## 1.2 Convenciones del Documento
* El documento se presenta en español.
* Los requisitos se enumeran de manera jerárquica (ej. W1, W2).
* Se utiliza terminología estándar en ingeniería de software: Sistema, Usuario, Requisito, Componente.

## 1.3 Audiencia y Uso Previsto
La audiencia de este documento incluye desarrolladores, gerentes de proyecto, y el cliente. Se utilizará como referencia durante todo el ciclo de vida del sistema.

## 1.4 Alcance
El sistema ZZZ estará conformado por los siguientes componentes:
* **Wearable:** Dispositivo que recolecta métricas fisiológicas (ritmo cardíaco, pasos, nivel de actividad) y envía datos al móvil.
* **Aplicación móvil (empleados):** Visualiza métricas personales, muestra alertas y recomendaciones, y sincroniza información con el wearable y el backend.
* **Aplicación web (supervisores):** Dashboard con métricas agregadas, gestión de usuarios, generación de reportes y herramientas para la toma de decisiones.
* **Backend API:** Centraliza y procesa los datos, expone endpoints para las aplicaciones y aplica algoritmos de análisis predictivo y machine learning para alertas y reportes.

## 1.5 Referencias
* IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications.
* Documentación oficial de: Django Rest Framework, React, and React Native.
* Buenas prácticas de UX/UI para aplicaciones industriales.

---

# 2. Descripción General

## 2.1 Perspectiva del Producto
El sistema se integra como una solución de monitoreo de fatiga con análisis de datos:
* **Entrada:** Datos recolectados por el wearable (movimiento, ritmo cardíaco, actividad física).
* **Procesamiento:** Backend desarrollado en Django Rest Framework que aplica algoritmos de detección y predicción de fatiga.
* **Salida:** Visualización personalizada en la aplicación móvil para empleados y dashboards de supervisión en la aplicación web.

## 2.2 Funciones del producto
El sistema proporcionará las siguientes funciones principales:

### Plataforma web
* **W1.** Dashboard general con métricas de empleados.
* **W2.** Visualización individual y grupal.
* **W3.** Administración de usuarios (empleados, supervisores, administradores).
* **W4.** Generación de reportes e historial de métricas.
* **W5.** Configuración de umbrales de alerta.
* **W6.** Alertas en tiempo real para supervisores.

### Móvil
* **M1.** Sincronización con el wearable.
* **M2.** Visualización de métricas personales con gráficos históricos.
* **M3.** Alertas y notificaciones al empleado.
* **M4.** Perfil de usuario y metas de salud.
* **M5.** Recomendaciones personalizadas con inteligencia artificial.
* **M6.** Enlace con el backend para centralizar datos.

### Wearable
* **R1.** Monitoreo en tiempo real de métricas fisiológicas (ritmo cardiaco, actividad).
* **R2.** Visualización inmediata en la pantalla del reloj.
* **R3.** Notificaciones de fatiga o riesgo físico.
* **R4.** Envío automático de datos a la app móvil.

### Machine Learning
* **ML1:** Detección de patrones de fatiga en función de los datos fisiológicos y horarios de trabajo.
* **ML2:** Predicción de periodos de mayor riesgo de cansancio (ejemplo: identificar horas críticas del turno).
* **ML3:** Recomendaciones personalizadas para empleados (descansos, pausas activas).
* **ML4:** Análisis grupal para supervisores (detectar qué equipos presentan más cansancio y en qué horarios).
* **ML5:** Generación de alertas tempranas antes de que el empleado llegue a niveles críticos de fatiga.

### 2.2.2 Roles
* **Empleado (App móvil + Wearable):** Consulta métricas personales, recibe alertas y recomendaciones, y accede a su historial de fatiga.
* **Supervisor (App web):** Visualiza dashboards individuales y grupales, genera reportes y toma decisiones sobre pausas, rotación de tareas y prevención de riesgos.
* **Administrador (Backend + Web):** Gestiona usuarios y roles, configura parámetros globales del sistema y supervisa la infraestructura y la seguridad.

### 2.2.3 Plataforma
* **Wearable:** Sensores biométricos (ritmo cardíaco, acelerómetro, giroscopio) con conectividad Bluetooth y Wi-Fi.
* **Aplicación móvil (React Native):** Android (escalable a iOS), permite visualizar métricas individuales, notificaciones y recomendaciones.
* **Aplicación web (React):** Navegadores modernos (Chrome, Edge, Firefox), dashboards y gestión de usuarios.
* **Backend (Django Rest Framework):** API REST/GraphQL, despliegue en nube (AWS/Azure/GCP), procesamiento de datos y machine learning.
* **Base de datos (PostgreSQL):** Almacena métricas, usuarios y reportes de manera estructurada y escalable.

## 2.3 Entorno Operativo
* **Wearable:** Dispositivo portátil con sensores de movimiento y ritmo cardíaco, sincroniza datos mediante Bluetooth/Wi-Fi.
* **Aplicación móvil:** Android, desarrollada en React Native, comunica con wearable y backend.
* **Aplicación web:** Navegadores modernos, desarrollada en React, orientada a gestión y visualización de métricas.
* **Backend:** Django Rest Framework con PostgreSQL, desplegado en la nube, accesible desde móvil y web.

## 2.4 Restricciones de Diseño e Implementación
* El wearable debe ser de bajo costo y totalmente compatible con el ecosistema Android.
* El sistema debe operar en tiempo casi real, con un retraso máximo de 5 segundos en la transmisión de datos desde el wearable hasta la visualización en las aplicaciones.
* Los datos deben estar protegidos mediante cifrado en tránsito (HTTPS/TLS) y cifrado en reposo en la base de datos.
* La arquitectura debe permitir escalabilidad horizontal, previendo el aumento de usuarios y dispositivos.
* La solución debe cumplir con estándares básicos de privacidad de datos (ej. consentimiento del usuario y control de acceso).

## 2.5 Documentación del Usuario
* **Manual de Empleados:** Guía de uso del wearable y la aplicación móvil, incluyendo sincronización de datos, visualización de métricas personales, alertas y recomendaciones.
* **Manual de Supervisores:** Instrucciones para acceder y navegar en el dashboard web, interpretar métricas individuales y grupales, generar reportes y gestionar equipos.
* **Guía Técnica para Administradores:** Documentación para instalación, configuración del sistema, administración de usuarios y roles, mantenimiento de la infraestructura y monitoreo de la seguridad y disponibilidad del backend.

## 2.6 Supuestos y Dependencias
* Los empleados aceptan usar el wearable durante la jornada laboral.
* Disponibilidad de conexión a internet para sincronización de datos.
* Precisión de la detección depende de los sensores del wearable.
* El sistema depende de la infraestructura en la nube para disponibilidad y seguridad.
* Supervisores y administradores cuentan con dispositivos compatibles y conocimientos básicos de uso.
* Los modelos de Machine Learning podrán entrenarse con datos históricos suficientes.

---

# 3. Requisitos del Sistema

## 3.1 Requisitos Funcionales

### Autentificación

| ID | Descripcion | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- |
| RF-01 | Inicio de sesión para los usuarios registrados | Alta | N/A |

### Plataforma Web

| ID | Descripción | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- |
| W1 | Inicio de sesión con JWT para usuarios registrados | Alta | PostgreSQL, API de autenticación |
| W2 | CRUD de empleados (crear, editar, eliminar, consultar) | Alta | PostgreSQL |
| W3 | CRUD de supervisores y administradores con gestión de roles | Alta | PostgreSQL |
| W4 | Dashboard en React para mostrar métricas en tiempo real | Alta | API REST, WebSockets |
| W5 | Generación de reportes en PDF y Excel | Media | PostgreSQL, librerías ReportLab/OpenPy XL |
| W6 | CRUD de configuraciones de umbrales y parámetros | Alta | PostgreSQL |
| W7 | Consulta histórica de métricas con filtros por fecha, turno o empleado | Alta | PostgreSQL |
| W8 | Panel grupal con gráficas agregadas por turno/equipo | Media | PostgreSQL, librería de gráficas |

### Aplicacion Movil

| ID | Descripción | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- |
| M1 | Sincronización con wearable vía BLE | Alta | Dispositivo wearable |
| M2 | CRUD de usuario (registro, edición, baja lógica) | Alta | PostgreSQL vía API REST |
| M3 | Visualización de métricas en gráficas interactivas | Alta | API REST, librería de gráficas |
| M4 | CRUD de metas personales (ej. horas de descanso) | Media | PostgreSQL |
| M5 | Recepción de alertas en tiempo real (WebSocket) | Alta | Backend, PostgreSQL |
| M6 | Envío de datos al backend en lotes | Alta | API REST |
| M7 | Visualización de recomendaciones personalizadas del módulo ML | Media | API REST ML |

### Wearable

| ID | Descripción | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- |
| R1 | Captura de metricas con sensores integrados | Alta | API del reloj |
| R2 | Transmisión de datos al móvil vía BLE | Alta | Aplicación móvil |
| R3 | Visualización en pantalla de métricas actuales | Media | API del reloj |
| R4 | Generación de alertas locales (vibración y notificación) | Alta | Configuración del supervisor |
| R5 | Activación/pausa de monitoreo | Media | API del reloj |

### Módulo de Machine Learning (Backend)

| ID | Descripción | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- |
| ML1 | Procesamiento de datos históricos en PostgreSQL para entrenar modelos | Alta | PostgreSQL |
| ML2 | Entrenamiento de modelos predictivos de fatiga | Alta | PostgreSQL, librería ML |
| ML3 | Exposición de endpoint/predict-fatigue | Alta | API REST |
| ML4 | Exposición de endpoint/recommendations | Alta | API REST |
| ML5 | Generación de alertas tempranas basadas en predicciones | Alta | Backend, WebSockets |
| ML6 | Agregación de métricas por equipos usando consultas SQL | Media | PostgreSQL |

## 3.2 Requisitos de Interfaz Externa
* **Interfaces de hardware:** Sensores del wearable (ritmo cardíaco, acelerómetro, giroscopio).
* **Interfaces de software:** API REST/GraphQL entre apps y backend.
* **Interfaces de usuario:**
    * **Móvil:** Pantallas simples, notificaciones de fatiga.
    * **Web:** Dashboard interactivo con gráficas.

## 3.3 Requisitos del Sistema
* El sistema debe procesar al menos 1000 empleados simultáneamente.
* Disponibilidad mínima: 99.5%.
* Respuesta máxima de consulta web: <2 segundos.

## 3.4 Requisitos No Funcionales
* **Seguridad:** Autenticación con JWT, encriptación de datos sensibles.
* **Escalabilidad:** Soporte para integración con múltiples plantas industriales.
* **Usabilidad:** Interfaces intuitivas y adaptadas a usuarios no técnicos.
* **Mantenibilidad:** Código modular, documentado y con pruebas unitarias.
* **Portabilidad:** Apps compatibles con Android/iOS, Web compatible con navegadores modernos.

---

# 4. Anexos

## 4.1 Modelo Relacional

A continuación se describen las entidades del modelo relacional:

* **Employee**
    * employee_id
    * name
    * last_name
    * employee_number
    * fk department
* **Users**
    * user_id
    * username
    * password
    * role
    * fk employee_id
* **Wearables**
    * wearable_id
    * serial number
    * model
    * status
* **Departaments**
    * department_id
    * name
    * fk supervisor_user (user_id)
* **Tasks**
    * task_id
    * task name
    * start time
    * end time
    * fk work_session_id
* **Wearables_assignment**
    * wearables_assignment_id
    * start date
    * end date
    * fk wearable_id
    * fk user_id
* **Reports**
    * report_id
    * report type
    * parameters
    * date
    * content
* **Work_sessions**
    * work_sessions_id
    * start time
    * end time
    * shift
    * fk user_id
    * fk department_id
* **Shift_intervals**
    * shift_intervals_id
    * start date
    * end_date
    * prom_heart_rate
    * prom_spo2
    * prom_activity
    * prom_stress
    * fk work_session_id
* **Metrics**
    * metric_id
    * date
    * heart rate
    * spo2
    * steps
    * movement
    * stress
    * fk wearable_id
    * fk user_id
* **Alerts**
    * alert_id
    * alert type
    * level
    * date
    * fk metric_id