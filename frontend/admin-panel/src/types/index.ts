// User types based on backend models
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'admin' | 'supervisor' | 'employee';
  notifications_enabled: boolean;
  fatigue_alerts_enabled: boolean;
  ai_recommendations_enabled: boolean;
  sync_enabled: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface Employee {
  employee_id: string;
  user: User;
  name: string;
  last_name: string;
  full_name: string;
  employee_number?: string;
  department?: Department;
  department_name?: string;
  location?: string;
  hire_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Authentication types
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
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Metrics and monitoring types
export interface MetricData {
  id: number;
  employee: Employee;
  timestamp: string;
  heart_rate?: number;
  hrv_rmssd?: number;
  stress_level: 'low' | 'medium' | 'high';
  activity_level: number;
  created_at: string;
}

export interface Alert {
  id: number;
  employee: Employee;
  alert_type: 'fatigue' | 'stress' | 'health' | 'recommendation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: number;
  employee: Employee;
  goal_type: 'steps' | 'sleep' | 'stress' | 'custom';
  title: string;
  description?: string;
  target_value: number;
  current_value: number;
  unit: string;
  start_date: string;
  end_date: string;
  is_achieved: boolean;
  is_active: boolean;
  created_at: string;
}

// Dashboard stats
export interface DashboardStats {
  total_employees: number;
  active_employees: number;
  critical_alerts: number;
  avg_stress_level: number;
  total_departments: number;
  completed_goals: number;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  category?: string;
}
