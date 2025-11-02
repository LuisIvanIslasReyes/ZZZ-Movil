// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  REFRESH: '/auth/refresh/',
  REGISTER: '/auth/register/',
} as const;

// Main API endpoints
export const API_ENDPOINTS = {
  USERS: '/users/',
  EMPLOYEES: '/users/employees/',
  PROFILE: '/users/profile/',
  DEPARTMENTS: '/departments/',
  METRICS: '/metrics/',
  ALERTS: '/alerts/',
  GOALS: '/goals/',
  REPORTS: '/reports/',
  WEARABLES: '/wearables/',
  WORK_SESSIONS: '/work-sessions/',
  TASKS: '/tasks/',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'zzz_access_token',
  REFRESH_TOKEN: 'zzz_refresh_token',
  USER_DATA: 'zzz_user_data',
} as const;

// Application Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  EMPLOYEES: '/employees',
  DEPARTMENTS: '/departments',
  METRICS: '/metrics',
  ALERTS: '/alerts',
  GOALS: '/goals',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;
