import { Router } from 'express';
import ProducController from '../controllers/ProducController';

const productRouter = Router();

productRouter.post('/', ProducController.cadastrarProduto);
productRouter.get('/', ProducController.listarProdutos);

export default productRouter;