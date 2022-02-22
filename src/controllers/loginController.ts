import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { IUser, UserId } from '../interface/User';
import { Retornos } from '../interface/Retornos';
import { validarNomeESenha } from '../schemas/validations';
import { createToken } from '../schemas/authentication';

const login = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;
  const validar: Retornos = validarNomeESenha(user);
  if (validar.status !== 200) {
    res.status(validar.status).json({ error: validar.error });
    return;
  }
  const result: IUser = await UserModel.pegarUsuario(user.username, user.password);
  if (!result) {
    res.status(401).json({ error: 'Username or password invalid' });
    return;
  }
  const newUser: UserId = {
    id: result.id,
    username: result.username,
  };
  const token = createToken(newUser);
  res.status(200).json({ token });
};

export default {
  login,
};
