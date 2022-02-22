import { Request, Response } from 'express';
import { UserId } from '../interface/UserId';
import { Retornos } from '../interface/Retornos';
import { UserCreate } from '../interface/UserCreate';
import UserService from '../services/UserService';
import { validarUsuario } from '../schemas/validations';
import { createToken } from '../schemas/authentication';

const cadastrarUsuario = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;
  const validar: Retornos = validarUsuario(user);
  if (validar.status !== 200) {
    res.status(validar.status).json({ error: validar.error });
    return;
  }
  const result: UserCreate = await UserService.cadastrarUsuario(user);
  const newUser: UserId = {
    id: result.id,
    username: user.username,
  };
  const token: string = createToken(newUser);
  res.status(result.status).json({ token });
};

export default {
  cadastrarUsuario,
};