# 🎯 Guia de Referência Rápida

## 📝 Comandos Essenciais

### Desenvolvimento
```bash
npm run dev              # Iniciar servidor (hot reload)
npm test                 # Rodar testes
npm run lint             # Verificar código
npm run format           # Formatar código
```

### Banco de Dados
```bash
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Criar migração
npm run prisma:studio    # Interface visual (localhost:5555)
```

### Docker
```bash
docker compose up        # Subir backend + MySQL
docker compose down      # Parar containers
docker compose logs -f   # Ver logs em tempo real
```

### Build e Deploy
```bash
npm run build            # Compilar TypeScript
npm start                # Rodar em produção
docker build -t api .    # Build da imagem Docker
```

---

## 🔑 Variáveis de Ambiente

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `DATABASE_URL` | ✅ | String de conexão MySQL | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | ✅ | Chave para assinar tokens | `minha_chave_super_secreta_123` |
| `JWT_EXPIRES_IN` | ❌ | Tempo de expiração do token | `7d` |
| `PORT` | ❌ | Porta da API | `3000` |
| `FRONTEND_URL` | ❌ | URL do frontend (CORS) | `http://localhost:5500` |
| `LOGTAIL_SOURCE_TOKEN` | ❌ | Token do Better Stack | `xxxxxxxxx` |
| `LOG_LEVEL` | ❌ | Nível de log | `info` |
| `NODE_ENV` | ❌ | Ambiente | `development` |

---

## 🔐 GitHub Secrets Necessários

### Backend Repository

| Secret | Onde Conseguir | Para Que Serve |
|--------|----------------|----------------|
| `DOCKER_USERNAME` | Docker Hub → Account Settings | Push de imagens Docker |
| `DOCKER_PASSWORD` | Docker Hub → Security → New Access Token | Push de imagens Docker |
| `SONAR_TOKEN` | SonarCloud → My Account → Security | Análise de código |
| `LOGTAIL_SOURCE_TOKEN` | Better Stack → Sources → Copy Token | Envio de logs |

**GITHUB_TOKEN** é automático, não precisa adicionar! ✅

---

## 🌐 Endpoints da API

### Públicos (sem autenticação)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/register` | Criar conta |
| `POST` | `/api/auth/login` | Fazer login |

### Protegidos (requer Authorization header)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/users/me` | Buscar perfil |
| `PUT` | `/api/users/me` | Atualizar perfil |
| `DELETE` | `/api/users/me` | Deletar conta |

**Header**: `Authorization: Bearer SEU_TOKEN_JWT`

---

## 📊 Dashboards e Links

| Ferramenta | URL | O Que Ver |
|------------|-----|-----------|
| **SonarCloud** | https://sonarcloud.io/ | Qualidade de código, bugs, vulnerabilidades |
| **Better Stack** | https://logs.betterstack.com/ | Logs em tempo real, alertas |
| **GitHub Actions** | https://github.com/juramal/user-management-backend/actions | Workflows CI/CD |
| **Docker Hub** | https://hub.docker.com/r/juramal/user-management-backend | Imagens Docker |
| **Prisma Studio** | http://localhost:5555 | Visualizar banco de dados (local) |

---

## 🧪 Testes

### Estrutura
```
src/
├── __tests__/
│   └── *.test.ts         # Arquivos de teste
```

### Comandos
```bash
npm test                  # Rodar todos os testes
npm run test:watch        # Modo watch
npm run test:ci           # Para CI (com coverage)
```

### Ver Coverage
```bash
# Após rodar npm test
start coverage/lcov-report/index.html
```

---

## 📝 Logging

### Importar e Usar
```typescript
import logger from './utils/logger';

logger.info('Mensagem informativa');
logger.warn('Aviso');
logger.error('Erro crítico');

// Com contexto
logger.info('Usuário criado', { userId: 123, email: 'test@test.com' });
```

### Níveis
- `error` → Erros críticos
- `warn` → Avisos
- `info` → Informações gerais (padrão)
- `debug` → Detalhes para debugging

---

## 🚨 Alertas no Better Stack

### Alertas Recomendados

| Nome | Condição | Notificação |
|------|----------|-------------|
| **Erro Alto Volume** | `level:error count > 10 in 5min` | Email + Slack |
| **Auth Failure** | `message:*"login failed"* count > 5 in 10min` | Email |
| **DB Down** | `message:*"database connection"* level:error` | Email + SMS |

---

## 🔄 Conventional Commits

| Tipo | Resultado | Exemplo |
|------|-----------|---------|
| `feat:` | Minor release (1.0.0 → 1.1.0) | `feat: adicionar recuperação de senha` |
| `fix:` | Patch release (1.0.0 → 1.0.1) | `fix: corrigir validação de email` |
| `feat!:` | Major release (1.0.0 → 2.0.0) | `feat!: remover suporte a Node 14` |
| `docs:` | Sem release | `docs: atualizar README` |
| `chore:` | Sem release | `chore: atualizar dependências` |
| `style:` | Sem release | `style: formatar código` |
| `refactor:` | Sem release | `refactor: reorganizar estrutura` |

---

## 🐛 Troubleshooting Rápido

### Erro: "ENONPMTOKEN"
✅ **Solução**: Já corrigido - `.releaserc.json` tem `npmPublish: false`

### Erro: "libssl.so.1.1 not found"
✅ **Solução**: Já corrigido - Dockerfile instala OpenSSL

### Erro: "tsconfig.json not found"
✅ **Solução**: Já corrigido - `.dockerignore` atualizado

### Porta 3000 em uso
```bash
# Mudar porta no .env
PORT=3001
```

### MySQL não conecta
```bash
# Verificar se MySQL está rodando
# Verificar DATABASE_URL no .env
# Ou usar Docker Compose
docker compose up
```

---

## 📚 Documentação Completa

| Arquivo | Conteúdo |
|---------|----------|
| **README.md** | Documentação principal do projeto |
| **CICD_SETUP_GUIDE.md** | Setup completo CI/CD, SonarCloud, Better Stack |
| **IMPLEMENTACAO_RESUMO.md** | Resumo de todas as implementações |
| **QUICK_REFERENCE.md** | Este arquivo (referência rápida) |

---

## ✅ Checklist Antes de Fazer PR

- [ ] Código formatado (`npm run format`)
- [ ] Sem erros de linting (`npm run lint`)
- [ ] Testes passando (`npm test`)
- [ ] Build funciona (`npm run build`)
- [ ] Commit convencional (`feat:`, `fix:`, etc.)
- [ ] .env não commitado
- [ ] Documentação atualizada (se necessário)

---

## 🎓 Para o Trabalho Acadêmico

### Requisitos Atendidos

✅ **Steps no pipeline Actions** → `.github/workflows/ci.yml` (9 steps)  
✅ **Logs no Better Stack** → `src/utils/logger.ts` + Winston + Logtail  
✅ **Alertas no Better Stack** → 3 alertas configuráveis  
✅ **Integração com Sonar** → Job no CI + `sonar-project.properties`  

### Como Demonstrar

1. **Steps**: Acesse GitHub Actions, mostre os steps com emojis
2. **Logs**: Acesse Better Stack, mostre logs em tempo real
3. **Alertas**: Mostre configuração de alertas no Better Stack
4. **Sonar**: Acesse SonarCloud, mostre análise de código

---

**Atualizado**: 2025-01-11  
**Versão do Projeto**: 1.1.0
