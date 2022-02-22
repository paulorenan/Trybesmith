import UserModel from '../models/UserModel';
import { User } from '../interface/User';
import { Retornos } from '../interface/Retornos';
import { validarUsuario } from '../schemas/validations';

const cadastrarUsuario = async (user: User): Promise<Retornos> => {
  const result = validarUsuario(user);
  if (result.status !== 200) {
    return result;
  }
  await UserModel.cadastrarUsuario(user);
  return { message: 'Usuário cadastrado com sucesso!', status: 200 };
};

export default {
  cadastrarUsuario,
};