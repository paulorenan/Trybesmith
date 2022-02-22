import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User, IUser } from '../interface/User';

const cadastrarUsuario = async (user: User): Promise<number> => {
  const { username, classe, level, password } = user;
  const q = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
  const [result] = await connection
    .execute<ResultSetHeader>(q, [username, classe, level, password]);
  const { insertId: id } = result;
  return id;
};

const pegarUsuario = async (username: string, password: string): Promise<IUser> => {
  const q = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';
  const [result] = await connection.execute(q, [username, password]);
  const [user] = result as IUser[];
  return user;
};

export default {
  cadastrarUsuario,
  pegarUsuario,
};