import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Product, ProductId } from '../interface/Product';

const cadastrarProduto = async (product: Product): Promise<number> => {
  const { name, amount } = product;
  const q = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
  const [result] = await connection
    .execute<ResultSetHeader>(q, [name, amount]);
  const { insertId: id } = result;
  return id;
};

const listarProdutos = async (): Promise<ProductId[]> => {
  const q = 'SELECT * FROM Trybesmith.Products';
  const [result] = await connection.execute(q);
  return result as ProductId[];
};

export default {
  cadastrarProduto,
  listarProdutos,
};