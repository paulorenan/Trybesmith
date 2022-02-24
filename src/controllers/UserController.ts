import { Request, Response } from 'express';
import { UserId, UserCreate } from '../interface/User';
import { Retornos } from '../interface/Retornos';
import UserService from '../services/UserService';
import { validarUsuario } from '../schemas/validations';
import { createToken } from '../schemas/authentication';

const cadastrarUsuario = async (req: Request, res: Response) => {
  const user = req.body;
  const validar: Retornos = validarUsuario(user);
  if (validar.status !== 200) return res.status(validar.status).json({ error: validar.error });
  const result: UserCreate = await UserService.cadastrarUsuario(user);
  const newUser: UserId = { id: result.id, username: user.username };
  const token: string = createToken(newUser);
  return res.status(result.status).json({ token });
};

export default {
  cadastrarUsuario,
};