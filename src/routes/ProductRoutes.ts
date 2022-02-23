import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();

productRouter.post('/', ProductController.cadastrarProduto);
productRouter.get('/', ProductController.listarProdutos);

export default productRouter;