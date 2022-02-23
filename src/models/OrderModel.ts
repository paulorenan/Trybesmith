import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { AllOrders, Order, Product } from '../interface/Order';

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

const pegarTodosPedidos = async (): Promise<AllOrders[]> => {
  const q = 'SELECT * FROM Trybesmith.Orders';
  const [result] = await connection.execute(q);
  const data = result as Order[];
  const q2 = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
  const pedidos = data
    .map(async (pedido) => {
      const [result2] = await connection.execute(q2, [pedido.id]);
      const data2 = result2 as Product[];
      return {
        id: pedido.id,
        userId: pedido.userId,
        products: data2.map((product: { id: number }) => product.id),
      };
    });
  return Promise.all(pedidos);
};

const pegarPedidoId = async (id: number): Promise<AllOrders | null> => {
  const q = 'SELECT * FROM Trybesmith.Orders WHERE id = ?';
  const [result] = await connection.execute(q, [id]);
  const data = result as Order[];
  if (data.length === 0) {
    return null;
  }
  const q2 = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
  const pedido = data[0];
  const [result2] = await connection.execute(q2, [pedido.id]);
  const data2 = result2 as Product[];
  return {
    id: pedido.id,
    userId: pedido.userId,
    products: data2.map((product: { id: number }) => product.id),
  };
};

export default {
  cadastrarPedido,
  pegarTodosPedidos,
  pegarPedidoId,
};
