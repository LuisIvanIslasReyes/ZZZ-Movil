#!/bin/bash

# Script de configuración para el entorno de desarrollo ZZZ Frontend

echo "🚀 Configurando entorno de desarrollo ZZZ Frontend..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado."
    echo "Por favor instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! npx semver -r ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
    echo "❌ Error: Se requiere Node.js 18+ (actual: $NODE_VERSION)"
    exit 1
fi

echo "✅ Node.js $NODE_VERSION detectado"

# Navegar al directorio del frontend
cd "$(dirname "$0")"

# Verificar si package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    echo "Asegúrate de estar en el directorio correcto del frontend"
    exit 1
fi

# Instalar dependencias si node_modules no existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Error al instalar dependencias"
        exit 1
    fi
    
    echo "✅ Dependencias instaladas correctamente"
else
    echo "✅ Dependencias ya instaladas"
fi

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creando archivo de configuración .env.local..."
    
    cat > .env.local << EOL
# Configuración del entorno de desarrollo ZZZ
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=ZZZ Admin Panel
VITE_APP_VERSION=1.0.0
EOL
    
    echo "✅ Archivo .env.local creado"
else
    echo "✅ Archivo .env.local ya existe"
fi

echo ""
echo "🎉 ¡Configuración completa!"
echo ""
echo "📋 Comandos disponibles:"
echo "   npm run dev      - Iniciar servidor de desarrollo"
echo "   npm run build    - Construir para producción"
echo "   npm run preview  - Vista previa del build"
echo "   npm run lint     - Verificar código"
echo ""
echo "🌐 Para iniciar el desarrollo:"
echo "   npm run dev"
echo ""
echo "   El servidor estará disponible en: http://localhost:5173"
echo ""
echo "📚 Documentación adicional en README.md"
