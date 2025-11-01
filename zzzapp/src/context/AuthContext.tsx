import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { User, AuthTokens } from '../types/auth.types';

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay una sesión activa al iniciar la app
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // Verificar si hay tokens almacenados
      const storedTokens = await authService.getStoredTokens();
      const storedUser = await authService.getStoredUser();

      if (storedTokens && storedUser) {
        setTokens(storedTokens);
        setUser(storedUser);
        setIsAuthenticated(true);
        
        // Opcional: Refrescar el perfil del usuario
        try {
          const freshUser = await authService.getProfile();
          setUser(freshUser);
        } catch (error) {
          // Si falla al obtener el perfil, mantener el usuario almacenado
          console.log('No se pudo refrescar el perfil, usando datos almacenados');
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login({ username, password });
      
      setUser(response.user);
      setTokens({ access: response.access, refresh: response.refresh });
      setIsAuthenticated(true);
    } catch (error: any) {
      const errorMessage = error.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      
      setUser(null);
      setTokens(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar el estado local incluso si falla la petición
      setUser(null);
      setTokens(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const freshUser = await authService.getProfile();
      setUser(freshUser);
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
