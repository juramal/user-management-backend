import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Buscar dados do usuário logado
router.get('/me', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        fullName: true,
        birthDate: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Atualizar dados do usuário
router.put('/me', async (req: Request, res: Response) => {
  try {
    const { fullName, birthDate, email, password, currentPassword } = req.body;

    // Buscar usuário atual
    const currentUser = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Se está mudando a senha, validar senha atual
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Senha atual é obrigatória para alterar a senha' });
      }

      const isValidPassword = await bcrypt.compare(currentPassword, currentUser.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Senha atual incorreta' });
      }
    }

    // Se está mudando o email, verificar se já existe
    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (fullName) updateData.fullName = fullName;
    if (birthDate) updateData.birthDate = new Date(birthDate);
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        birthDate: true,
        email: true,
        updatedAt: true
      }
    });

    return res.json({
      message: 'Usuário atualizado com sucesso',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
router.delete('/me', async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.userId }
    });

    return res.json({ message: 'Usuário deletado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router;
