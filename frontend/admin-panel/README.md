# ZZZ Admin Panel

Panel de administración web para el sistema de monitoreo de estrés y fatiga de empleados ZZZ (Zero to Zero-Fatigue Zone).

## Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler
- **TailwindCSS** + **DaisyUI** para el diseño
- **React Router DOM** para navegación
- **Axios** para peticiones HTTP
- **Lucide React** para iconos

## Características

### ✅ Implementado
- 🔐 **Autenticación JWT** - Login/logout con tokens de acceso
- 🎨 **Interfaz moderna** - Diseño responsive con DaisyUI
- 📱 **Sidebar responsive** - Navegación adaptable a dispositivos móviles
- 🏠 **Dashboard principal** - Vista general con estadísticas clave
- 👥 **Gestión de empleados** - Lista y filtros básicos
- 🚨 **Centro de alertas** - Visualización de notificaciones del sistema
- 🔒 **Rutas protegidas** - Control de acceso basado en autenticación
- 🔄 **Refresh automático de tokens** - Manejo automático de sesiones

### 🚧 En desarrollo
- 🏢 Gestión completa de departamentos
- 📊 Visualización de métricas y gráficos
- 🎯 Configuración de objetivos
- 📄 Generación de reportes
- ⚙️ Panel de configuración

## Instalación y Configuración

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Navegar al directorio del proyecto:**
   ```bash
   cd frontend/admin-panel
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Crear archivo `.env.local`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_APP_NAME=ZZZ Admin Panel
   VITE_APP_VERSION=1.0.0
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación:**
   - URL: `http://localhost:5173`
   - Credenciales de prueba: Ver backend para usuarios de prueba

## Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Construcción
npm run build        # Construir para producción
npm run preview      # Vista previa del build

# Linting
npm run lint         # Verificar código con ESLint
```

## Integración con Backend

El frontend se conecta al backend Django REST API:

- **Base URL:** `http://localhost:8000/api/v1`
- **Autenticación:** Bearer Token (JWT)
- **Formato:** JSON

### Endpoints principales utilizados:
- `/auth/login/` - Autenticación
- `/users/` - Gestión de usuarios
- `/employees/` - Información de empleados
- `/alerts/` - Sistema de alertas
- `/departments/` - Departamentos

---

**ZZZ Platform - Zero to Zero-Fatigue Zone**  
© 2024 Sistema de Monitoreo de Estrés y Fatiga
