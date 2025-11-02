# Script de configuración para el entorno de desarrollo ZZZ Frontend (Windows)

Write-Host "🚀 Configurando entorno de desarrollo ZZZ Frontend..." -ForegroundColor Cyan

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no está instalado." -ForegroundColor Red
    Write-Host "Por favor instala Node.js 18+ desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Navegar al directorio del script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Verificar si package.json existe
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json no encontrado" -ForegroundColor Red
    Write-Host "Asegúrate de estar en el directorio correcto del frontend" -ForegroundColor Yellow
    exit 1
}

# Instalar dependencias si node_modules no existe
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencias ya instaladas" -ForegroundColor Green
}

# Crear archivo .env.local si no existe
if (!(Test-Path ".env.local")) {
    Write-Host "⚙️ Creando archivo de configuración .env.local..." -ForegroundColor Yellow
    
    $envContent = @"
# Configuración del entorno de desarrollo ZZZ
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=ZZZ Admin Panel
VITE_APP_VERSION=1.0.0
"@
    
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    
    Write-Host "✅ Archivo .env.local creado" -ForegroundColor Green
} else {
    Write-Host "✅ Archivo .env.local ya existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 ¡Configuración completa!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Comandos disponibles:" -ForegroundColor Cyan
Write-Host "   npm run dev      - Iniciar servidor de desarrollo" -ForegroundColor White
Write-Host "   npm run build    - Construir para producción" -ForegroundColor White
Write-Host "   npm run preview  - Vista previa del build" -ForegroundColor White
Write-Host "   npm run lint     - Verificar código" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Para iniciar el desarrollo:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "   El servidor estará disponible en: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentación adicional en README.md" -ForegroundColor White
