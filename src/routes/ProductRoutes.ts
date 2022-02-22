import { Router } from 'express';
import ProducController from '../controllers/ProducController';

const productRouter = Router();

productRouter.post('/', ProducController.cadastrarProduto);

export default productRouter;