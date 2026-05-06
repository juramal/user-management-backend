import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições de arquivos locais (null), localhost:5500 e a URL do .env
    const allowedOrigins = [
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Permite origin null (arquivos locais) ou origins da lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Em desenvolvimento, permite todas as origins
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz da API
app.get('/api', (req, res) => {
  res.json({
    message: '🎯 API de Gerenciamento de Usuários',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      users: {
        getProfile: 'GET /api/users/me (requer autenticação)',
        updateProfile: 'PUT /api/users/me (requer autenticação)',
        deleteAccount: 'DELETE /api/users/me (requer autenticação)'
      },
      health: 'GET /api/health'
    }
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 API disponível em: http://localhost:${PORT}/api`);
});
