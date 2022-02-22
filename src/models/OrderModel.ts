import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const cadastrarPedido = async (userId: number, products: []) => {
  const q = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [result] = await connection
    .execute<ResultSetHeader>(q, [userId]);
  const { insertId: id } = result;
  products.forEach(async (product: number) => {
    await connection
      .execute('UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?', [id, product]);
  });
  return id;
};

export default {
  cadastrarPedido,
};
