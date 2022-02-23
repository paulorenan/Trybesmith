import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

orderRouter.post('/', OrderController.cadastrarPedido);
orderRouter.get('/', OrderController.pegarTodosPedidos);

export default orderRouter;
