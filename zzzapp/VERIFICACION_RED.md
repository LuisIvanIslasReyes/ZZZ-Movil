# Script de Verificación de Conexión

## 🔍 Verificar que el backend esté accesible desde tu red

### Desde tu computadora:
```bash
# Opción 1: Usar curl
curl http://192.168.1.181:8000/api/auth/login/ -X POST

# Opción 2: Usar tu navegador
# Abre: http://192.168.1.181:8000/docs/
```

### Desde tu dispositivo móvil (si tienes navegador):
```
http://192.168.1.181:8000/docs/
```

Si el Swagger UI se carga, la conexión está funcionando correctamente.

## 🚨 Troubleshooting de Red

### 1. Verificar IP de tu computadora
```powershell
ipconfig
```
Busca "Adaptador de LAN inalámbrica Wi-Fi" o "Adaptador de Ethernet"
La IPv4 debe ser 192.168.1.181

### 2. Verificar que el servidor esté corriendo
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

### 3. Configurar Firewall de Windows

Si no puedes conectarte desde el dispositivo móvil:

**PowerShell (Ejecutar como Administrador):**
```powershell
# Permitir conexiones al puerto 8000
New-NetFirewallRule -DisplayName "Django Development Server" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
```

O manualmente:
1. Panel de Control → Sistema y Seguridad → Firewall de Windows Defender
2. Configuración avanzada → Reglas de entrada
3. Nueva regla → Puerto → TCP → 8000 → Permitir la conexión

### 4. Verificar desde la terminal

**Ping a tu servidor:**
```powershell
# Desde tu dispositivo, usa una app de terminal o desde otra computadora en la misma red
ping 192.168.1.181
```

**Test del puerto:**
```powershell
Test-NetConnection -ComputerName 192.168.1.181 -Port 8000
```

## 📱 Configuración para diferentes escenarios

### Emulador Android (en la misma máquina):
En `IP.tsx`, la función automáticamente usa `10.0.2.2` en modo desarrollo.

### iOS Simulator (en la misma máquina):
Usa la IP de red local: `192.168.1.181`

### Dispositivo Físico (mismo WiFi):
Usa la IP de red local: `192.168.1.181`

### Dispositivo Físico (diferente red):
Necesitas ngrok o similar para tunelizar:
```bash
ngrok http 8000
```
Luego actualiza `SERVER_IP` en `IP.tsx` con la URL de ngrok.

## ✅ Checklist Pre-Prueba

- [ ] Backend corriendo en `0.0.0.0:8000`
- [ ] Swagger UI accesible en navegador: http://192.168.1.181:8000/docs/
- [ ] Firewall configurado para permitir puerto 8000
- [ ] Dispositivo móvil conectado al mismo WiFi
- [ ] IP correcta en `IP.tsx` (192.168.1.181)
- [ ] Usuario de prueba existe en BD (juan.perez / password123)

## 🎯 Comandos Rápidos

**Iniciar Backend:**
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

**Iniciar App:**
```bash
cd zzzapp
npm start
```

**Ver logs en tiempo real:**
- Backend: Aparecen en la terminal donde corriste runserver
- App: Aparecen en la terminal de Expo
- Redux DevTools: Si instalas react-native-debugger

## 📊 Estados Esperados

### Login Exitoso:
```
Backend: "POST /api/auth/login/ HTTP/1.1" 200
App: Navega a HomeScreen
AsyncStorage: Contiene access_token, refresh_token, user
```

### Login Fallido:
```
Backend: "POST /api/auth/login/ HTTP/1.1" 400 o 401
App: Muestra Alert con mensaje de error
AsyncStorage: Vacío
```

### Token Refresh:
```
Backend: "POST /api/auth/token/refresh/ HTTP/1.1" 200
App: Petición original se reintenta automáticamente
AsyncStorage: access_token actualizado
```

### Logout:
```
Backend: No hay petición (solo limpieza local)
App: Navega a LoginScreen
AsyncStorage: Limpio (sin tokens ni user)
```
