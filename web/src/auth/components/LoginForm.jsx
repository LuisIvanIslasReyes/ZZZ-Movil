import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaFingerprint, FaInfoCircle, FaHeartbeat } from 'react-icons/fa';
import '../css/login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 600);
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <div className="login-logo">
            <FaHeartbeat size={40} />
          </div>
          <h1 className="login-title">Zero to Zero-Fatigue Zone</h1>
          <p className="login-subtitle">Bienvenido de nuevo</p>
        </div>
        <h2 className="form-title">Iniciar Sesión</h2>
        <div className="input-group">
          <label>Usuario</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button className="login-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            'Iniciando sesión...'
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <FaArrowRight />
            </>
          )}
        </button>
        <div className="divider">
          <span>o continúa con</span>
        </div>
        <button type="button" className="biometric-btn">
          <FaFingerprint size={20} />
          <span>Autenticación Biométrica</span>
        </button>
        <div className="help-section">
          <FaInfoCircle size={16} />
          <span>¿Problemas para acceder? Contacta al administrador del sistema</span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
