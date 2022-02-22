import { Request, Response } from 'express';
import { User } from '../interface/User';
import { Retornos } from '../interface/Retornos';
import UserService from '../services/UserService';

const cadastrarUsuario = async (req: Request, res: Response): Promise<void> => {
  const user: User = req.body;
  const result: Retornos = await UserService.cadastrarUsuario(user);
  if (result.status !== 200) {
    res.status(result.status).json(result.error);
    return;
  }
  res.status(result.status).json(result.message);
};

export default {
  cadastrarUsuario,
};