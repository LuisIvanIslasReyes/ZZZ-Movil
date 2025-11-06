import { Platform } from 'react-native';

// Configuración de la IP del servidor backend
// Cambia esta IP según tu red local
export const SERVER_IP = '172.18.5.76';
export const SERVER_PORT = '8000';

// Función para obtener la URL base según la plataforma
export const getBaseUrl = (): string => {
  if (Platform.OS === 'android') {
    // Android emulator usa 10.0.2.2 para localhost de la máquina host
    // Si estás usando un dispositivo físico Android, usará SERVER_IP
    if (__DEV__) {
      // En desarrollo, puedes usar la IP de tu red
      return `http://${SERVER_IP}:${SERVER_PORT}`;
    }
    return `http://10.0.2.2:${SERVER_PORT}`;
  } else if (Platform.OS === 'ios') {
    // iOS simulator puede usar localhost
    return `http://${SERVER_IP}:${SERVER_PORT}`;
  } else {
    // Web o cualquier otra plataforma
    return `http://${SERVER_IP}:${SERVER_PORT}`;
  }
};

// URLs completas
export const API_BASE_URL = `${getBaseUrl()}/api`;
export const WS_BASE_URL = `ws://${SERVER_IP}:${SERVER_PORT}/ws`; // Para WebSockets si se necesitan

// Exportar también la IP y puerto por separado por si se necesitan
export default {
  SERVER_IP,
  SERVER_PORT,
  getBaseUrl,
  API_BASE_URL,
  WS_BASE_URL,
};
