"""
Configuración para entorno de desarrollo local.
"""
from .base import *
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv(BASE_DIR / '.env')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-local-dev-key-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database - PostgreSQL con soporte para con/sin contraseña
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'ZZZ'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'OPTIONS': {
            # Esto ayuda con conexiones sin contraseña
            'connect_timeout': 10,
        }
    }
}

# CORS - permitir todos los orígenes en desarrollo
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8081',
    'http://127.0.0.1:8081',
    'exp://localhost:8081',
]
CORS_ALLOW_ALL_ORIGINS = True  # Solo para desarrollo

# Email backend (consola para desarrollo)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
