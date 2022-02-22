import OrderModel from '../models/OrderModel';
import { UserCreate } from '../interface/User';

const cadastrarPedido = async (id: number, products: []): Promise<UserCreate> => {
  const orderId = await OrderModel.cadastrarPedido(id, products);
  return { message: 'okay', status: 201, id: orderId };
};

export default {
  cadastrarPedido,
};