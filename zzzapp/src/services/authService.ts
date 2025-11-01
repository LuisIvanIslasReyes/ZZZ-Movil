import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/config';
import { LoginRequest, LoginResponse, User, AuthTokens } from '../types/auth.types';

// Claves para AsyncStorage
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

class AuthService {
  /**
   * Realiza el login del usuario
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login/', credentials);
      const { access, refresh, user } = response.data;

      // Guardar tokens y usuario en AsyncStorage
      await this.saveTokens({ access, refresh });
      await this.saveUser(user);

      return response.data;
    } catch (error: any) {
      console.error('Error en login:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout(): Promise<void> {
    try {
      // Opcional: llamar al endpoint de logout si existe
      // await apiClient.post('/auth/logout/');
      
      // Limpiar todos los datos del usuario
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  /**
   * Obtiene el perfil del usuario autenticado
   */
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile/');
      await this.saveUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Refresca el access token usando el refresh token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }

      const response = await apiClient.post<{ access: string }>('/auth/token/refresh/', {
        refresh: refreshToken,
      });

      const { access } = response.data;
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      
      return access;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      // Si falla, limpiar todo y forzar re-login
      await this.logout();
      throw this.handleError(error);
    }
  }

  /**
   * Guarda los tokens en AsyncStorage
   */
  async saveTokens(tokens: AuthTokens): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
    } catch (error) {
      console.error('Error al guardar tokens:', error);
      throw error;
    }
  }

  /**
   * Obtiene los tokens almacenados
   */
  async getStoredTokens(): Promise<AuthTokens | null> {
    try {
      const access = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refresh = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (access && refresh) {
        return { access, refresh };
      }

      return null;
    } catch (error) {
      console.error('Error al obtener tokens:', error);
      return null;
    }
  }

  /**
   * Guarda el usuario en AsyncStorage
   */
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }

  /**
   * Obtiene el usuario almacenado
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      
      if (userJson) {
        return JSON.parse(userJson);
      }

      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  /**
   * Verifica si hay una sesión activa
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const tokens = await this.getStoredTokens();
      return tokens !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Maneja errores de las peticiones
   */
  private handleError(error: any): Error {
    if (error.response) {
      // El servidor respondió con un código de error
      const message = error.response.data?.detail 
        || error.response.data?.message 
        || error.response.data?.error
        || 'Error en la autenticación';
      
      return new Error(message);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      return new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Algo pasó al configurar la petición
      return new Error(error.message || 'Error desconocido');
    }
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
