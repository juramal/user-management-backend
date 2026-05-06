## 🔧 Backend - Sistema de Gerenciamento de Usuários

API REST para gerenciamento de usuários com autenticação JWT, desenvolvida em Node.js, TypeScript, Express e MySQL.

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** (Framework web)
- **Prisma** (ORM)
- **MySQL** (Banco de dados)
- **JWT** (Autenticação)
- **bcryptjs** (Criptografia de senhas)
- **CORS** (Integração com frontend)

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8 ou superior)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/user-management-backend.git
cd user-management-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados MySQL

Crie um banco de dados no MySQL:

```sql
CREATE DATABASE user_management;
```

### 4. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
copy .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/user_management"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_123456"
JWT_EXPIRES_IN="7d"
PORT=3000
FRONTEND_URL="http://localhost:5500"
```

**⚠️ IMPORTANTE**: 
- Substitua as credenciais do MySQL
- Gere um JWT_SECRET seguro e aleatório
- Ajuste o FRONTEND_URL conforme necessário

### 5. Execute as migrações do Prisma

```bash
npm run prisma:generate
npm run prisma:migrate
```

Quando solicitado, dê um nome para a migração, por exemplo: `init`

## ▶️ Executando a API

### Modo de Desenvolvimento

```bash
npm run dev
```

A API iniciará em: **http://localhost:3000**

### Modo de Produção

```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Health Check

#### GET `/api/health`
Verifica se a API está funcionando.

**Resposta (200):**
```json
{
  "status": "ok",
  "message": "API está funcionando!"
}
```

### Autenticação

#### POST `/api/auth/register`
Cria uma nova conta de usuário.

**Body:**
```json
{
  "fullName": "João da Silva",
  "birthDate": "1990-01-15",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João da Silva",
    "email": "joao@email.com",
    "birthDate": "1990-01-15T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/login`
Realiza login e retorna token JWT.

**Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João da Silva",
    "email": "joao@email.com",
    "birthDate": "1990-01-15T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuários (Rotas Autenticadas)

**⚠️ Todas as rotas abaixo requerem o header:**
```
Authorization: Bearer {seu_token_jwt}
```

#### GET `/api/users/me`
Retorna dados do usuário autenticado.

**Resposta (200):**
```json
{
  "id": 1,
  "fullName": "João da Silva",
  "birthDate": "1990-01-15T00:00:00.000Z",
  "email": "joao@email.com",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

#### PUT `/api/users/me`
Atualiza dados do usuário autenticado.

**Body (campos opcionais):**
```json
{
  "fullName": "João Pedro da Silva",
  "birthDate": "1990-01-15",
  "email": "joaopedro@email.com",
  "currentPassword": "senha123",
  "password": "novaSenha456"
}
```

**⚠️ Nota**: Para alterar a senha, é obrigatório enviar `currentPassword` e `password`.

**Resposta (200):**
```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João Pedro da Silva",
    "birthDate": "1990-01-15T00:00:00.000Z",
    "email": "joaopedro@email.com",
    "updatedAt": "2024-01-01T13:00:00.000Z"
  }
}
```

#### DELETE `/api/users/me`
Deleta a conta do usuário autenticado.

**Resposta (200):**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

## 🗂️ Estrutura do Projeto

```
user-management-backend/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── config/
│   │   └── database.ts        # Configuração do Prisma
│   ├── middlewares/
│   │   └── auth.middleware.ts # Middleware de autenticação JWT
│   ├── routes/
│   │   ├── auth.routes.ts     # Rotas de autenticação
│   │   └── user.routes.ts     # Rotas de usuários
│   └── server.ts              # Servidor Express
├── .env                       # Variáveis de ambiente (não commitado)
├── .env.example               # Exemplo de variáveis
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Inicia servidor em modo desenvolvimento (hot reload)
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor em modo produção
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações do banco
npm run prisma:studio    # Abre interface visual do Prisma (localhost:5555)
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt (salt rounds: 10)
- ✅ Tokens JWT com expiração configurável
- ✅ Validação de dados no backend
- ✅ Proteção contra SQL Injection (via Prisma ORM)
- ✅ CORS configurado para aceitar apenas frontend autorizado
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Validação de senha atual ao alterar senha

## 🧪 Testando com cURL

### Criar usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"João da Silva\",\"birthDate\":\"1990-01-15\",\"email\":\"joao@email.com\",\"password\":\"senha123\"}"
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"joao@email.com\",\"password\":\"senha123\"}"
```

### Buscar dados do usuário (substitua o TOKEN)
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🧪 Testando com Postman/Insomnia

Importe a coleção de endpoints ou configure manualmente:

1. **Register**: POST `http://localhost:3000/api/auth/register`
2. **Login**: POST `http://localhost:3000/api/auth/login`
3. **Get User**: GET `http://localhost:3000/api/users/me` (adicione header Authorization)
4. **Update User**: PUT `http://localhost:3000/api/users/me` (adicione header Authorization)
5. **Delete User**: DELETE `http://localhost:3000/api/users/me` (adicione header Authorization)

## 🐛 Solução de Problemas

### Erro de conexão com MySQL

Verifique:
- O MySQL está rodando
- As credenciais no `.env` estão corretas
- O banco de dados `user_management` foi criado

### Erro nas migrações do Prisma

```bash
# Resete o banco e reexecute as migrações
npm run prisma:migrate reset
npm run prisma:migrate
```

### Porta 3000 já está em uso

Altere a variável `PORT` no arquivo `.env`:

```env
PORT=3001
```

### Erro de CORS

Verifique se o `FRONTEND_URL` no `.env` está correto:

```env
FRONTEND_URL="http://localhost:5500"
```

## 🔗 Integração com Frontend

Este backend foi projetado para ser consumido pelo frontend em:
- **Repositório Frontend**: https://github.com/juramal/user-management-frontend

Certifique-se de:
1. Configurar o `FRONTEND_URL` no `.env` do backend
2. Configurar o `API_URL` no frontend apontando para este backend

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão MySQL | `mysql://user:pass@localhost:3306/db` |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | `string_aleatoria_segura_123` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d` (7 dias) |
| `PORT` | Porta onde a API rodará | `3000` |
| `FRONTEND_URL` | URL do frontend para CORS | `http://localhost:5500` |

## 📄 Licença

MIT

---

**🎉 Backend configurado e pronto para uso!**

Para iniciar o desenvolvimento:
```bash
npm run dev
```

Acesse: http://localhost:3000/api/health
