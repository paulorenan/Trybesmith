import ProductModel from '../models/ProductModel';
import { Product } from '../interface/Product';
import { UserCreate } from '../interface/User';

const cadastrarProduto = async (product: Product): Promise<UserCreate> => {
  const id = await ProductModel.cadastrarProduto(product);
  return { message: 'Produto cadastrado com sucesso!', status: 201, id };
};

export default {
  cadastrarProduto,
};