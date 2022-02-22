import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User } from '../interface/User';

const cadastrarUsuario = async (user: User): Promise<any> => {
  const { username, classe, level, password } = user;
  const query = 'INSERT INTO users (username, classe, level, password) VALUES (?, ?, ?, ?)';
  await connection.execute<ResultSetHeader>(query, [username, classe, level, password]);
};

export default {
  cadastrarUsuario,
};