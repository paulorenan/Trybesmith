import UserModel from '../models/UserModel';
import { User } from '../interface/User';
import { Retornos } from '../interface/Retornos';

const cadastrarUsuario = async (user: User): Promise<Retornos> => {
  await UserModel.cadastrarUsuario(user);
  return { message: 'Usuário cadastrado com sucesso!', status: 200 };
};

export default {
  cadastrarUsuario,
};