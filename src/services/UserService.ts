import UserModel from '../models/UserModel';
import { User } from '../interface/User';
import { UserCreate } from '../interface/UserCreate';

const cadastrarUsuario = async (user: User): Promise<UserCreate> => {
  const [resulta] = await UserModel.cadastrarUsuario(user);
  const { insertId: id } = resulta;
  return { message: 'Usuário cadastrado com sucesso!', status: 200, id };
};

export default {
  cadastrarUsuario,
};