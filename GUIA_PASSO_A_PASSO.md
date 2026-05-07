# 👨‍🎓 Guia Passo a Passo - Configuração para o Trabalho Acadêmico

Este guia te levará do zero até ter tudo funcionando para apresentar ao professor.

---

## 📋 Tempo Estimado: 30-40 minutos

---

## PARTE 1: Preparação Local (10 min)

### Passo 1.1: Instalar Dependências

```bash
cd d:\Projetos Node\integracaoentrega\user-management-backend
npm install
```

✅ **Verificar**: Deve instalar ~200 pacotes sem erros

### Passo 1.2: Configurar .env

Seu `.env` deve ter no mínimo:

```env
DATABASE_URL="mysql://root:root_password@localhost:3306/user_management"
JWT_SECRET="minha_chave_super_secreta_para_desenvolvimento_123"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
LOG_LEVEL="info"
```

✅ **Verificar**: Arquivo `.env` existe na raiz do projeto

### Passo 1.3: Testar Localmente

```bash
# Subir com Docker Compose
docker compose up
```

Abra o navegador: http://localhost:3000/api/health

✅ **Verificar**: Deve retornar `{"status":"ok",...}`

---

## PARTE 2: Configurar SonarCloud (10 min)

### Passo 2.1: Criar Conta

1. Acesse: https://sonarcloud.io/
2. Clique em **"Log in"**
3. Escolha **"Sign up with GitHub"**
4. Autorize o SonarCloud a acessar seu GitHub

✅ **Verificar**: Você está logado no SonarCloud

### Passo 2.2: Criar Organização

1. No SonarCloud, clique no **"+"** (canto superior direito)
2. Escolha **"Analyze new project"**
3. Clique em **"Import an organization from GitHub"**
4. Selecione sua organização GitHub (`juramal`)
5. Escolha o plano **"Free"**
6. Clique em **"Create Organization"**

✅ **Verificar**: Organização criada (ex: `juramal`)

### Passo 2.3: Adicionar Projeto Backend

1. Clique em **"Analyze new project"**
2. Selecione **`user-management-backend`**
3. Clique em **"Set Up"**
4. Escolha **"With GitHub Actions"**
5. **COPIE O TOKEN** que aparece (só mostra uma vez!)
6. Guarde o token em um arquivo temporário

✅ **Verificar**: Token copiado (formato: `sqp_xxxxxxxxxxxxx`)

### Passo 2.4: Adicionar Secret no GitHub

1. Acesse: https://github.com/juramal/user-management-backend
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**
4. **Name**: `SONAR_TOKEN`
5. **Secret**: Cole o token do SonarCloud
6. Clique em **"Add secret"**

✅ **Verificar**: Secret `SONAR_TOKEN` aparece na lista

### Passo 2.5: Atualizar sonar-project.properties

Edite o arquivo `sonar-project.properties`:

```properties
sonar.projectKey=juramal_user-management-backend
sonar.organization=juramal
```

**Importante**: Substitua `juramal` pela sua organização!

✅ **Verificar**: Organização correta no arquivo

---

## PARTE 3: Configurar Better Stack (10 min)

### Passo 3.1: Criar Conta

1. Acesse: https://betterstack.com/
2. Clique em **"Start free trial"**
3. Cadastre-se com seu email ou GitHub
4. Confirme seu email

✅ **Verificar**: Você está logado no Better Stack

### Passo 3.2: Criar Source

1. No dashboard, clique em **"Logs"** (menu lateral)
2. Clique em **"Sources"**
3. Clique em **"Connect source"**
4. Procure por **"Node.js"**
5. Dê um nome: `User Management Backend`
6. **COPIE O TOKEN** (formato longo)
7. Clique em **"Create source"**

✅ **Verificar**: Token copiado

### Passo 3.3: Adicionar ao .env Local

Edite seu `.env` e adicione:

```env
LOGTAIL_SOURCE_TOKEN=seu_token_copiado_aqui
```

✅ **Verificar**: Token adicionado no `.env`

### Passo 3.4: Adicionar Secret no GitHub

1. Acesse: https://github.com/juramal/user-management-backend
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**
4. **Name**: `LOGTAIL_SOURCE_TOKEN`
5. **Secret**: Cole o token do Better Stack
6. Clique em **"Add secret"**

✅ **Verificar**: Secret `LOGTAIL_SOURCE_TOKEN` aparece na lista

### Passo 3.5: Testar Logs Localmente

```bash
# Reiniciar o Docker Compose
docker compose down
docker compose up
```

1. Acesse: https://logs.betterstack.com/
2. Clique no seu source: `User Management Backend`
3. Você deve ver logs chegando! 🎉

✅ **Verificar**: Logs aparecem no Better Stack

### Passo 3.6: Criar Alertas

#### Alerta 1: Volume Alto de Erros

1. No Better Stack, vá em **"Alerts"**
2. Clique em **"Create alert"**
3. Configure:
   - **Name**: `Backend - Erro Alto Volume`
   - **Source**: Selecione `User Management Backend`
   - **Query**: `level:error`
   - **Threshold**: `count > 10 in 5 minutes`
4. Em **Notifications**, adicione seu email
5. Clique em **"Create alert"**

✅ **Verificar**: Alerta criado

#### Alerta 2: Falhas de Autenticação

1. Clique em **"Create alert"** novamente
2. Configure:
   - **Name**: `Backend - Auth Failure`
   - **Source**: `User Management Backend`
   - **Query**: `message:*"login failed"*`
   - **Threshold**: `count > 5 in 10 minutes`
3. Adicione seu email
4. Clique em **"Create alert"**

✅ **Verificar**: Alerta criado

#### Alerta 3: Banco de Dados Down

1. Clique em **"Create alert"** novamente
2. Configure:
   - **Name**: `Backend - Database Down`
   - **Source**: `User Management Backend`
   - **Query**: `message:*"database connection"* AND level:error`
   - **Threshold**: `count > 1 in 5 minutes`
3. Adicione seu email
4. Clique em **"Create alert"**

✅ **Verificar**: 3 alertas criados no total

---

## PARTE 4: Fazer Commit e Push (5 min)

### Passo 4.1: Commitar Mudanças

```bash
cd d:\Projetos Node\integracaoentrega\user-management-backend

git add .
git commit -m "feat: adicionar SonarCloud, Better Stack, testes e documentação completa"
git push origin main
```

✅ **Verificar**: Push realizado sem erros

### Passo 4.2: Acompanhar Workflows

1. Acesse: https://github.com/juramal/user-management-backend/actions
2. Você verá o workflow **"CI - Backend"** rodando
3. Clique nele para ver os steps

✅ **Verificar**: Workflow rodando ou concluído

---

## PARTE 5: Verificar Tudo Funcionando (5 min)

### Passo 5.1: Verificar GitHub Actions

1. Acesse: https://github.com/juramal/user-management-backend/actions
2. Veja o último workflow run
3. Verifique se todos os steps passaram (✅)

**Steps esperados**:
- 📥 Checkout code
- 🔧 Setup Node.js
- 📦 Install dependencies
- 🔨 Generate Prisma Client
- 🗄️ Run database migrations
- 🧪 Run tests with coverage
- 🏗️ Build TypeScript
- 🔍 Check for TypeScript errors
- 📊 Upload coverage to artifacts
- 🔬 SonarCloud Scan

✅ **Verificar**: Todos os steps com ✅ verde

### Passo 5.2: Verificar SonarCloud

1. Acesse: https://sonarcloud.io/
2. Clique no projeto `user-management-backend`
3. Você verá a análise de código!

**Métricas para verificar**:
- 🐛 Bugs
- 🔐 Vulnerabilities
- 💡 Code Smells
- 📊 Coverage

✅ **Verificar**: Análise concluída com sucesso

### Passo 5.3: Verificar Better Stack

1. Acesse: https://logs.betterstack.com/
2. Clique no source `User Management Backend`
3. Veja os logs em tempo real

✅ **Verificar**: Logs aparecem

### Passo 5.4: Verificar Alertas

1. No Better Stack, vá em **"Alerts"**
2. Veja os 3 alertas criados

✅ **Verificar**: 3 alertas configurados

---

## 🎓 PRONTO PARA APRESENTAR AO PROFESSOR!

### Checklist Final

- [x] Backend rodando localmente
- [x] Testes funcionando (`npm test`)
- [x] SonarCloud configurado
- [x] Better Stack configurado
- [x] 3 Alertas criados
- [x] GitHub Actions rodando
- [x] Todos os steps passando
- [x] Commits convencionais funcionando

---

## 📸 O Que Mostrar na Apresentação

### 1. GitHub Actions (Steps no Pipeline)

**URL**: https://github.com/juramal/user-management-backend/actions

**O que mostrar**:
- Clique no último workflow run
- Mostre os steps com emojis descritivos
- Destaque o job do SonarCloud

### 2. Better Stack (Logs)

**URL**: https://logs.betterstack.com/

**O que mostrar**:
- Live tail dos logs em tempo real
- Filtro por nível (error, warn, info)
- Busca por mensagens específicas

### 3. Better Stack (Alertas)

**URL**: https://logs.betterstack.com/team/YOUR_TEAM/alerts

**O que mostrar**:
- Lista dos 3 alertas configurados
- Condições de cada alerta
- Notificações configuradas

### 4. SonarCloud (Qualidade de Código)

**URL**: https://sonarcloud.io/dashboard?id=juramal_user-management-backend

**O que mostrar**:
- Overview do projeto
- Métricas de qualidade
- Quality Gate status
- Coverage de testes

---

## 🆘 Problemas Comuns

### Workflow falha no SonarCloud

**Causa**: Token inválido ou expirado

**Solução**:
1. Vá no SonarCloud → My Account → Security
2. Revoke o token antigo
3. Gere novo token
4. Atualize o secret no GitHub

### Logs não aparecem no Better Stack

**Causa**: Token inválido ou não configurado

**Solução**:
1. Verifique o token no `.env`
2. Reinicie a aplicação: `docker compose down && docker compose up`
3. Verifique o dashboard do Better Stack

### Workflow falha nos testes

**Causa**: Dependências desatualizadas

**Solução**:
```bash
npm install
npm test
```

Se passar localmente, commite e push novamente.

---

## 📞 Suporte

Se algo não funcionar:

1. **Leia a documentação**:
   - [README.md](README.md)
   - [CICD_SETUP_GUIDE.md](../CICD_SETUP_GUIDE.md)
   - [IMPLEMENTACAO_RESUMO.md](IMPLEMENTACAO_RESUMO.md)

2. **Verifique os logs**:
   - GitHub Actions logs
   - Better Stack dashboard
   - Console local (`docker compose logs -f`)

3. **Troubleshooting**:
   - Veja seção Troubleshooting no [CICD_SETUP_GUIDE.md](../CICD_SETUP_GUIDE.md)

---

## ✨ Conclusão

Seguindo este guia, você terá:

✅ Backend funcionando perfeitamente  
✅ Pipeline CI/CD completo no GitHub Actions  
✅ Logs centralizados no Better Stack  
✅ 3 Alertas configurados  
✅ Análise de código no SonarCloud  
✅ Testes automatizados com coverage  

**Tudo pronto para o trabalho acadêmico!** 🎉

---

**Boa sorte na apresentação!** 🎓🚀

**Data**: 2025-01-11  
**Versão**: 1.0.0
