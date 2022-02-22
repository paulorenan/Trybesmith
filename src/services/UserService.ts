import UserModel from '../models/UserModel';
import { User, UserCreate } from '../interface/User';

const cadastrarUsuario = async (user: User): Promise<UserCreate> => {
  const id = await UserModel.cadastrarUsuario(user);
  return { message: 'Usuário cadastrado com sucesso!', status: 201, id };
};

const pegarUsuario = async (username: string, password: string): Promise<User> => {
  const user = await UserModel.pegarUsuario(username, password);
  return user;
};

export default {
  cadastrarUsuario,
  pegarUsuario,
};