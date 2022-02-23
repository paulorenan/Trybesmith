import OrderModel from '../models/OrderModel';
import { UserCreate } from '../interface/User';
import { AllOrders } from '../interface/Order';

const cadastrarPedido = async (id: number, products: []): Promise<UserCreate> => {
  const orderId = await OrderModel.cadastrarPedido(id, products);
  return { message: 'okay', status: 201, id: orderId };
};

const pegarPedidoId = async (id: number): Promise<AllOrders | null> => {
  const order = await OrderModel.pegarPedidoId(id);
  if (order === null) {
    return null;
  }
  return {
    id: order.id,
    userId: order.userId,
    products: order.products,
  };
};

export default {
  cadastrarPedido,
  pegarPedidoId,
};