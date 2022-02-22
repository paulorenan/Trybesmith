import UserModel from '../models/UserModel';
import { User } from '../interface/User';
import { UserCreate } from '../interface/UserCreate';

const cadastrarUsuario = async (user: User): Promise<UserCreate> => {
  const id = await UserModel.cadastrarUsuario(user);
  return { message: 'Usuário cadastrado com sucesso!', status: 201, id };
};

export default {
  cadastrarUsuario,
};