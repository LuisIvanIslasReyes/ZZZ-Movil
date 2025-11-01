# Guía de Pruebas - Autenticación ZZZ App

## ✅ Implementación Completada

Se ha conectado exitosamente el frontend React Native con el backend Django. La autenticación JWT está completamente funcional.

## 📋 Archivos Creados/Modificados

### Nuevos Archivos:
1. **IP.tsx** - Configuración global de IP y puerto del servidor
2. **src/types/auth.types.ts** - Tipos TypeScript para autenticación
3. **src/api/config.ts** - Cliente Axios con interceptores JWT
4. **src/services/authService.ts** - Servicio de autenticación
5. **src/context/AuthContext.tsx** - Context global de autenticación

### Archivos Modificados:
1. **App.tsx** - Agregado AuthProvider
2. **src/navigation/RootNavigator.tsx** - Navegación basada en estado de auth
3. **src/auth/screens/LoginScreen.tsx** - Integración con useAuth hook
4. **src/profile/components/AccountActions.tsx** - Logout con confirmación

## 🔧 Configuración

### 1. IP del Servidor
En `IP.tsx` está configurado:
- **IP**: 192.168.1.181
- **Puerto**: 8000
- **URL API**: http://192.168.1.181:8000/api

### 2. Backend
Asegúrate de que el backend esté corriendo:
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

**Nota**: Usa `0.0.0.0:8000` para que el servidor sea accesible desde la red local.

### 3. Credenciales de Prueba
Usuario de prueba creado:
- **Username**: `juan.perez`
- **Password**: `password123`
- **Role**: employee
- **Employee ID**: EMP-2025-0001

## 🧪 Cómo Probar

### Paso 1: Iniciar Backend
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

Verifica que aparezca:
```
Starting development server at http://0.0.0.0:8000/
```

### Paso 2: Iniciar App Mobile
```bash
cd zzzapp
npm start
```

Opciones:
- Presiona `a` para Android
- Presiona `i` para iOS
- Escanea el QR con Expo Go para dispositivo físico

### Paso 3: Probar Login

1. **Abrir la app** - Deberías ver el LoginScreen
2. **Ingresar credenciales**:
   - Usuario: `juan.perez`
   - Contraseña: `password123`
3. **Presionar "Iniciar Sesión"**
4. **Verificar**:
   - Botón muestra "Iniciando sesión..."
   - Se navega automáticamente al AppNavigator (Home)
   - No hay errores en la consola

### Paso 4: Verificar Datos del Usuario

Navega a la pestaña de Perfil y verifica:
- Nombre completo: Juan Pérez
- Email: juan.perez@zzz.com
- Rol: employee

### Paso 5: Probar Logout

1. En la pantalla de Perfil, scroll hasta el final
2. Presionar "Cerrar Sesión"
3. Confirmar en el diálogo
4. Verificar que redirige al LoginScreen

### Paso 6: Verificar Persistencia

1. **Cerrar la app completamente**
2. **Volver a abrir la app**
3. **Verificar**: Debería mantenerte autenticado y llevarte directo al Home
4. Esto demuestra que los tokens se guardan correctamente en AsyncStorage

## 🔍 Debugging

### Ver logs del backend:
El servidor Django mostrará las peticiones:
```
"POST /api/auth/login/ HTTP/1.1" 200 456
"GET /api/auth/profile/ HTTP/1.1" 200 234
```

### Ver logs de la app:
En la terminal donde corriste `npm start`, verás logs de:
- Peticiones HTTP
- Errores de autenticación
- Navegación

### Errores Comunes:

1. **"No se pudo conectar con el servidor"**
   - Verifica que el backend esté corriendo
   - Verifica la IP en `IP.tsx`
   - Verifica que tu dispositivo/emulador esté en la misma red

2. **"Error 401 Unauthorized"**
   - Verifica las credenciales
   - Verifica que el usuario exista en la BD

3. **"Network Error"**
   - En Android emulator, verifica que uses `10.0.2.2`
   - En dispositivo físico, verifica la IP de red local
   - Verifica el firewall de Windows

## 📱 Flujos Implementados

### ✅ Login Flow:
1. Usuario ingresa credenciales
2. App hace POST a `/api/auth/login/`
3. Backend valida y retorna tokens JWT + datos de usuario
4. App guarda tokens en AsyncStorage
5. AuthContext actualiza estado global
6. Navigator detecta cambio y muestra AppNavigator

### ✅ Token Refresh Flow:
1. Petición falla con 401
2. Interceptor detecta el error
3. Automáticamente hace POST a `/api/auth/token/refresh/`
4. Obtiene nuevo access token
5. Reintenta la petición original
6. Si falla el refresh, hace logout automático

### ✅ Logout Flow:
1. Usuario presiona "Cerrar Sesión"
2. Muestra diálogo de confirmación
3. Limpia tokens de AsyncStorage
4. AuthContext limpia estado
5. Navigator muestra LoginScreen

### ✅ Persistence Flow:
1. App se abre
2. AuthContext verifica AsyncStorage
3. Si hay tokens, los carga
4. Opcional: refresca perfil del servidor
5. Actualiza estado de autenticación

## 🎯 Próximos Pasos

Ahora que la autenticación funciona, puedes:

1. **Consumir más endpoints** desde cualquier pantalla:
```typescript
import { apiClient } from '../api/config';

// Ejemplo: obtener alertas
const response = await apiClient.get('/alerts/');
```

2. **Usar datos del usuario autenticado**:
```typescript
import { useAuth } from '../context/AuthContext';

const { user } = useAuth();
console.log(user?.full_name); // Juan Pérez
console.log(user?.role); // employee
```

3. **Proteger pantallas según rol**:
```typescript
if (user?.role === 'admin') {
  // Mostrar opciones de admin
}
```

4. **Actualizar perfil**:
```typescript
await apiClient.patch('/auth/profile/', {
  notifications_enabled: true,
  fatigue_alerts_enabled: true
});
await refreshUser(); // Refresca los datos en el context
```

## 🔐 Seguridad

- ✅ Tokens JWT almacenados de forma segura en AsyncStorage
- ✅ Access token expira en 12 horas
- ✅ Refresh token expira en 7 días
- ✅ Auto-refresh de tokens cuando expiran
- ✅ Limpieza automática de tokens en logout
- ✅ Headers de Authorization automáticos en todas las peticiones

## 📚 Estructura del Código

```
zzzapp/
├── IP.tsx                          # ← Configuración global de IP
├── App.tsx                         # ← Envuelve todo en AuthProvider
├── src/
│   ├── types/
│   │   └── auth.types.ts          # ← Tipos TypeScript
│   ├── api/
│   │   └── config.ts              # ← Cliente Axios + interceptores
│   ├── services/
│   │   └── authService.ts         # ← Funciones de autenticación
│   ├── context/
│   │   └── AuthContext.tsx        # ← Estado global + useAuth hook
│   ├── navigation/
│   │   └── RootNavigator.tsx      # ← Navegación por auth
│   ├── auth/
│   │   └── screens/
│   │       └── LoginScreen.tsx    # ← Pantalla de login
│   └── profile/
│       └── components/
│           └── AccountActions.tsx # ← Botón de logout
```

## ✨ Características Implementadas

- ✅ Login con username y password
- ✅ Validación de campos antes de enviar
- ✅ Loading state durante autenticación
- ✅ Manejo de errores con Alert
- ✅ Almacenamiento persistente de tokens
- ✅ Auto-navegación después de login
- ✅ Verificación de sesión al abrir la app
- ✅ Refresh automático de tokens
- ✅ Logout con confirmación
- ✅ Configuración centralizada de IP
- ✅ Interceptores para incluir token en peticiones
- ✅ TypeScript en toda la implementación

---

**¡La autenticación está lista! Ahora puedes empezar a consumir los endpoints del backend desde cualquier pantalla de la app. 🚀**
