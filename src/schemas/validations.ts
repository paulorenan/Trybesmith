import { Retornos } from '../interface/Retornos';
import { User } from '../interface/User';

const validarNome = (nome: string): Retornos => {
  if (!nome) {
    return { status: 400, error: 'Username is required' };
  }
  if (typeof nome !== 'string') {
    return { status: 422, error: 'Username must be a string' };
  }
  if (nome.length <= 2) {
    return { status: 422, error: 'Username must be longer than 2 characters' };
  }
  return { status: 200, message: 'Username is valid' };
};

const validarClasse = (classe: string): Retornos => {
  if (!classe) {
    return { status: 400, error: 'Classe is required' };
  }
  if (typeof classe !== 'string') {
    return { status: 422, error: 'Classe must be a string' };
  }
  if (classe.length <= 2) {
    return { status: 422, error: 'Classe must be longer than 2 characters' };
  }
  return { status: 200, message: 'Classe is valid' };
};

const validarLevel = (level: number): Retornos => {
  if (level === undefined) {
    return { status: 400, error: 'Level is required' };
  }
  if (typeof level !== 'number') {
    return { status: 422, error: 'Level must be a number' };
  }
  if (level <= 0) {
    return { status: 422, error: 'Level must be greater than 0' };
  }
  return { status: 200, message: 'Level is valid' };
};

const validarSenha = (senha: string): Retornos => {
  if (!senha) {
    return { status: 400, error: 'Password is required' };
  }
  if (typeof senha !== 'string') {
    return { status: 422, error: 'Password must be a string' };
  }
  if (senha.length <= 7) {
    return { status: 422, error: 'Password must be longer than 7 characters' };
  }
  return { status: 200, message: 'Password is valid' };
};

const validarUsuario = (user: User): Retornos => {
  const nome = validarNome(user.username);
  const classe = validarClasse(user.classe);
  const level = validarLevel(user.level);
  const senha = validarSenha(user.password);
  if (nome.status !== 200) {
    return nome;
  }
  if (classe.status !== 200) {
    return classe;
  }
  if (level.status !== 200) {
    return level;
  }
  if (senha.status !== 200) {
    return senha;
  }
  return { status: 200, message: 'User is valid' };
};

const validarNomeESenha = (user: { username: string, password: string }): Retornos => {
  const nomeValidacao = validarNome(user.username);
  const senhaValidacao = validarSenha(user.password);
  if (nomeValidacao.status !== 200) {
    return nomeValidacao;
  }
  if (senhaValidacao.status !== 200) {
    return senhaValidacao;
  }
  return { status: 200, message: 'User is valid' };
};

export {
  validarUsuario,
  validarNomeESenha,
};