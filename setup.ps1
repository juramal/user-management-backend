# Script de Configuração - User Management Backend
# Execute este script após clonar o repositório

Write-Host "🚀 Iniciando configuração do projeto..." -ForegroundColor Green
Write-Host ""

# 1. Verificar Node.js
Write-Host "1️⃣  Verificando Node.js..." -ForegroundColor Cyan
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js não encontrado. Instale em: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# 2. Verificar MySQL
Write-Host ""
Write-Host "2️⃣  Verificando MySQL..." -ForegroundColor Cyan
$mysqlCheck = mysql --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MySQL instalado" -ForegroundColor Green
} else {
    Write-Host "⚠️  MySQL não encontrado. Você pode usar Docker Compose" -ForegroundColor Yellow
}

# 3. Instalar dependências
Write-Host ""
Write-Host "3️⃣  Instalando dependências..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# 4. Configurar .env
Write-Host ""
Write-Host "4️⃣  Configurando variáveis de ambiente..." -ForegroundColor Cyan
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado" -ForegroundColor Green
    Write-Host "⚠️  ATENÇÃO: Configure o .env com suas credenciais!" -ForegroundColor Yellow
} else {
    Write-Host "ℹ️  Arquivo .env já existe" -ForegroundColor Blue
}

# 5. Informações sobre SonarCloud
Write-Host ""
Write-Host "5️⃣  SonarCloud" -ForegroundColor Cyan
Write-Host "   Para configurar SonarCloud:" -ForegroundColor White
Write-Host "   1. Acesse: https://sonarcloud.io/" -ForegroundColor White
Write-Host "   2. Crie uma conta (Sign up with GitHub)" -ForegroundColor White
Write-Host "   3. Crie organização e projeto" -ForegroundColor White
Write-Host "   4. Copie o SONAR_TOKEN" -ForegroundColor White
Write-Host "   5. Adicione em GitHub Settings > Secrets > Actions" -ForegroundColor White
Write-Host ""
Write-Host "   📖 Veja detalhes em: CICD_SETUP_GUIDE.md" -ForegroundColor Gray

# 6. Informações sobre Better Stack
Write-Host ""
Write-Host "6️⃣  Better Stack (Logtail)" -ForegroundColor Cyan
Write-Host "   Para configurar Better Stack:" -ForegroundColor White
Write-Host "   1. Acesse: https://betterstack.com/" -ForegroundColor White
Write-Host "   2. Crie uma conta (Start Free Trial)" -ForegroundColor White
Write-Host "   3. Crie um Source para Node.js" -ForegroundColor White
Write-Host "   4. Copie o Source Token" -ForegroundColor White
Write-Host "   5. Adicione no .env: LOGTAIL_SOURCE_TOKEN=..." -ForegroundColor White
Write-Host "   6. Adicione em GitHub Settings > Secrets > Actions" -ForegroundColor White
Write-Host ""
Write-Host "   📖 Veja detalhes em: CICD_SETUP_GUIDE.md" -ForegroundColor Gray

# 7. Docker
Write-Host ""
Write-Host "7️⃣  Docker" -ForegroundColor Cyan
$dockerCheck = docker --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker instalado" -ForegroundColor Green
    Write-Host "   Para rodar localmente: docker compose up" -ForegroundColor White
} else {
    Write-Host "⚠️  Docker não encontrado" -ForegroundColor Yellow
    Write-Host "   Instale em: https://www.docker.com/products/docker-desktop" -ForegroundColor White
}

# 8. Resumo
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📋 PRÓXIMOS PASSOS" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configure o arquivo .env com suas credenciais" -ForegroundColor White
Write-Host "   - DATABASE_URL" -ForegroundColor Gray
Write-Host "   - JWT_SECRET" -ForegroundColor Gray
Write-Host "   - LOGTAIL_SOURCE_TOKEN (opcional para desenvolvimento)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Se usar MySQL local:" -ForegroundColor White
Write-Host "   npm run prisma:generate" -ForegroundColor Gray
Write-Host "   npm run prisma:migrate" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Se usar Docker:" -ForegroundColor White
Write-Host "   docker compose up" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Para desenvolvimento:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Para rodar testes:" -ForegroundColor White
Write-Host "   npm test" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Configure SonarCloud e Better Stack:" -ForegroundColor White
Write-Host "   Veja: CICD_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "7. Leia a documentação completa:" -ForegroundColor White
Write-Host "   - README.md" -ForegroundColor Gray
Write-Host "   - CICD_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "   - IMPLEMENTACAO_RESUMO.md" -ForegroundColor Gray
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Configuração inicial concluída!" -ForegroundColor Green
Write-Host "🚀 Pronto para começar o desenvolvimento!" -ForegroundColor Green
Write-Host ""
