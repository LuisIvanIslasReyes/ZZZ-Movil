# ZZZ - Sistema de Monitoreo de Estrés y Bienestar

## Frontend - Panel de Administración

### 🎨 Características del Login

- **Diseño moderno** con DaisyUI y Tailwind CSS
- **Validación en tiempo real** del formulario
- **Animaciones suaves** y transiciones
- **Responsive design** para móvil y desktop
- **Tema personalizado** con colores de la marca ZZZ
- **Indicadores visuales** de estado de campos
- **Función "Recordarme"** para mantener usuario guardado
- **Manejo de errores** elegante con alertas

### 🛠️ Tecnologías Utilizadas

- **React 19.1** con TypeScript
- **Vite** como build tool
- **Tailwind CSS** para estilos
- **DaisyUI** para componentes UI
- **Lucide React** para iconos
- **Axios** para llamadas HTTP
- **React Router** para navegación

### 🚀 Configuración e Instalación

1. **Instalar dependencias:**
   ```bash
   cd frontend/admin-panel
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   # .env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

### 🎭 Personalización del Tema

El tema personalizado `zzz` está configurado en `tailwind.config.js`:

```javascript
zzz: {
  "primary": "#1d4ed8",    // Azul principal
  "secondary": "#7c3aed",  // Púrpura secundario
  "accent": "#37cdbe",     // Verde azulado
  "neutral": "#3d4451",    // Gris neutral
  "base-100": "#ffffff",   // Fondo blanco
  "success": "#36d399",    // Verde éxito
  "warning": "#fbbd23",    // Amarillo advertencia
  "error": "#f87272",      // Rojo error
}
```

### 🔐 Integración con Backend

El login se conecta con el backend Django REST API en los siguientes endpoints:

- `POST /api/v1/auth/login/` - Autenticación
- `POST /api/v1/auth/refresh/` - Renovar token
- `POST /api/v1/auth/logout/` - Cerrar sesión
- `GET /api/v1/users/profile/` - Obtener perfil del usuario

### ✨ Características UX

- **Validación en tiempo real** con mensajes de error específicos
- **Estados visuales** de campos (error, éxito, neutro)
- **Animaciones CSS** para transiciones suaves
- **Feedback inmediato** al usuario
- **Diseño accesible** con etiquetas y contrastes apropiados
- **Carga progresiva** con spinners y estados de loading

## Backend - API REST

### 🗄️ Base de Datos

PostgreSQL con las siguientes tablas principales:
- `users` - Usuarios del sistema
- `departments` - Departamentos organizacionales
- `metrics` - Métricas biométricas
- `alerts` - Alertas del sistema
- `goals` - Objetivos de bienestar
- `reports` - Reportes generados

### 🔒 Autenticación

- **JWT Tokens** con refresh automático
- **Roles de usuario**: admin, supervisor, employee
- **Permisos granulares** por endpoint
- **Sesiones seguras** con expiración automática

### 🚀 Configuración del Backend

1. **Instalar dependencias:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configurar base de datos:**
   ```bash
   python manage.py migrate
   ```

3. **Crear superusuario:**
   ```bash
   python manage.py createsuperuser
   ```

4. **Ejecutar servidor:**
   ```bash
   python manage.py runserver
   ```

### 📱 App Móvil

La aplicación móvil React Native se encuentra en la carpeta `zzzapp/` y se conecta a la misma API REST.

---

## 🎯 Próximos Desarrollos

- [ ] Autenticación biométrica
- [ ] Notificaciones push en tiempo real
- [ ] Dashboard con gráficos avanzados
- [ ] Integración con más wearables
- [ ] Análisis predictivo con IA
- [ ] Exportación de reportes
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)

---

*Desarrollado con ❤️ para el bienestar laboral*