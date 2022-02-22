import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

orderRouter.post('/', OrderController.cadastrarPedido);

export default orderRouter;
