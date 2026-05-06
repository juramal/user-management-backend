import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '../config/database';

const router = Router();

// Registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { fullName, birthDate, email, password } = req.body;

    // Validações
    if (!fullName || !birthDate || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        fullName,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword
      }
    });

    // Gerar token
    const jwtOptions: SignOptions = {
      expiresIn: '7d'
    };
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      jwtOptions
    );

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        birthDate: user.birthDate
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Gerar token
    const jwtOptions: SignOptions = {
      expiresIn: '7d'
    };
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      jwtOptions
    );

    return res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        birthDate: user.birthDate
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

export default router;
