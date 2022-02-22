import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User } from '../interface/User';

const cadastrarUsuario = async (user: User): Promise<number> => {
  const { username, classe, level, password } = user;
  const q = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
  const [result] = await connection
    .execute<ResultSetHeader>(q, [username, classe, level, password]);
  const { insertId: id } = result;
  return id;
};

export default {
  cadastrarUsuario,
};