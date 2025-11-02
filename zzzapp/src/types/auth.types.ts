// Tipos de autenticación y usuario
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'employee' | 'supervisor' | 'admin';
  notifications_enabled: boolean;
  fatigue_alerts_enabled: boolean;
  ai_recommendations_enabled: boolean;
  sync_enabled: boolean;
  full_name?: string;
  date_joined?: string;
  is_active?: boolean;
  employee_profile?: EmployeeProfile; // Perfil de empleado si el rol es 'employee'
}

export interface EmployeeProfile {
  employee_id: string; // EMP-2025-0001
  name: string;
  last_name: string;
  full_name: string;
  employee_number?: string;
  department?: number;
  department_name?: string;
  location?: string;
  hire_date?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
