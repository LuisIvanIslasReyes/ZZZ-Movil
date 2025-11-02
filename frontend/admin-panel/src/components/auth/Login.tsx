import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Eye, EyeOff, AlertCircle, Shield, BarChart3, Users, CheckCircle, Wifi, Lock } from 'lucide-react';

interface FormErrors {
  username?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ username: false, password: false });
  
  const { login, isAuthenticated } = useAuth();

  // Cargar credenciales guardadas al montar el componente
  useEffect(() => {
    const savedUsername = localStorage.getItem('zzz_remembered_username');
    const savedRememberMe = localStorage.getItem('zzz_remember_me') === 'true';
    
    if (savedUsername && savedRememberMe) {
      setFormData(prev => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Validación en tiempo real
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'username':
        if (!value.trim()) {
          return 'El usuario o email es requerido';
        }
        if (value.length < 3) {
          return 'El usuario debe tener al menos 3 caracteres';
        }
        return '';
      case 'password':
        if (!value) {
          return 'La contraseña es requerida';
        }
        if (value.length < 6) {
          return 'La contraseña debe tener al menos 6 caracteres';
        }
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    errors.username = validateField('username', formData.username);
    errors.password = validateField('password', formData.password);
    
    setFormErrors(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Marcar todos los campos como tocados
    setTouched({ username: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      
      // Manejar "recordarme"
      if (rememberMe) {
        localStorage.setItem('zzz_remembered_username', formData.username);
        localStorage.setItem('zzz_remember_me', 'true');
      } else {
        localStorage.removeItem('zzz_remembered_username');
        localStorage.removeItem('zzz_remember_me');
      }
      
      setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div data-theme="zzz" className="min-h-screen hero bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="hero-content max-w-7xl w-full grid lg:grid-cols-2 gap-8 px-4">
        
        {/* Panel izquierdo - Información de la aplicación */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8 animate-fade-in">
          {/* Logo y título principal */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <Activity className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ZZZ
                </h1>
                <p className="text-white/80 text-xl font-light">Zero to Zero-Fatigue Zone</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-4xl font-light leading-tight">
                Sistema de Monitoreo de
                <span className="font-bold block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Estrés y Bienestar
                </span>
              </h2>
              
              <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                Plataforma inteligente para supervisar el bienestar de empleados y optimizar 
                la productividad mediante análisis avanzado de datos biométricos.
              </p>
            </div>
          </div>

          {/* Características destacadas con iconos animados */}
          <div className="grid gap-6">
            <div className="flex items-start space-x-4 group cursor-pointer">
              <div className="avatar">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Análisis en Tiempo Real</h3>
                <p className="text-white/75 leading-relaxed">
                  Monitoreo continuo de métricas vitales y detección temprana de fatiga
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group cursor-pointer">
              <div className="avatar">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Gestión Inteligente</h3>
                <p className="text-white/75 leading-relaxed">
                  Administración eficiente de equipos y departamentos con insights automáticos
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group cursor-pointer">
              <div className="avatar">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Alertas Preventivas</h3>
                <p className="text-white/75 leading-relaxed">
                  Notificaciones inteligentes basadas en IA para prevenir riesgos laborales
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas impactantes */}
          <div className="stats stats-vertical lg:stats-horizontal bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <div className="stat place-items-center">
              <div className="stat-value text-white font-black text-3xl">156</div>
              <div className="stat-desc text-white/80 font-medium">Empleados Activos</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-value text-success font-black text-3xl">89%</div>
              <div className="stat-desc text-white/80 font-medium">Tiempo Óptimo</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-value text-warning font-black text-3xl">42</div>
              <div className="stat-desc text-white/80 font-medium">Alertas Preventivas</div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Formulario de login */}
        <div className="flex flex-col justify-center animate-slide-up">
          {/* Logo móvil */}
          <div className="lg:hidden text-center mb-8">
            <div className="avatar mx-auto mb-4">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <Activity className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-black text-white">ZZZ Admin</h1>
            <p className="text-white/80 text-lg">Panel de Administración</p>
          </div>

          {/* Formulario principal */}
          <div className="card w-full max-w-md mx-auto bg-white shadow-2xl">
            <div className="card-body">
              <div className="text-center space-y-2 mb-8">
                <h2 className="card-title text-3xl font-bold text-gray-800 justify-center">
                  Iniciar Sesión
                </h2>
                <p className="text-gray-600">
                  Accede al panel de administración ZZZ
                </p>
              </div>

              {error && (
                <div className="alert alert-error shadow-lg mb-6 animate-slide-up">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success shadow-lg mb-6 animate-slide-up">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Usuario o Email</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingresa tu usuario o email"
                    className={`input input-bordered w-full transition-all duration-200 ${
                      formErrors.username && touched.username
                        ? 'input-error'
                        : formData.username && !formErrors.username
                        ? 'input-success'
                        : 'input-primary'
                    }`}
                    disabled={isLoading}
                  />
                  {formErrors.username && touched.username && (
                    <label className="label">
                      <span className="label-text-alt text-error text-xs">
                        {formErrors.username}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Contraseña</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ingresa tu contraseña"
                      className={`input input-bordered w-full pr-12 transition-all duration-200 ${
                        formErrors.password && touched.password
                          ? 'input-error'
                          : formData.password && !formErrors.password
                          ? 'input-success'
                          : 'input-primary'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm hover:bg-transparent"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && touched.password && (
                    <label className="label">
                      <span className="label-text-alt text-error text-xs">
                        {formErrors.password}
                      </span>
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="label cursor-pointer flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text text-gray-600">Recordarme</span>
                  </label>
                  
                  <button
                    type="button"
                    className="link link-primary text-sm"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.username || !formData.password}
                  className="btn btn-primary w-full text-white font-semibold disabled:opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              {/* Información adicional */}
              <div className="divider mt-8"></div>
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Sistema seguro protegido con JWT</span>
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span className="badge badge-ghost badge-sm">v1.0.0</span>
                  <span>•</span>
                  <span>© 2025 ZZZ Platform</span>
                </div>
                
                <div className="text-xs text-gray-400">
                  <span>🔒 Conexión segura SSL</span>
                  <span className="mx-2">•</span>
                  <span>⚡ Respuesta rápida</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ayuda */}
          <div className="text-center mt-6">
            <p className="text-white/90">
              ¿Necesitas ayuda?{' '}
              <button className="link link-accent font-semibold">
                Contacta soporte técnico
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Patrón de fondo animado */}
      <div className="absolute inset-0 pattern-dots opacity-10 animate-float pointer-events-none"></div>
    </div>
  );
};
