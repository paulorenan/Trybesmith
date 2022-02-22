import { Request, Response } from 'express';  
import { Retornos } from '../interface/Retornos';
import ProductService from '../services/ProductService';
import { validarAmountENome } from '../schemas/validations';

const cadastrarProduto = async (req: Request, res: Response): Promise<void> => {
  const product = req.body;
  const validar: Retornos = validarAmountENome(product);
  if (validar.status !== 200) {
    res.status(validar.status).json({ error: validar.error });
    return;
  }
  const id = await ProductService.cadastrarProduto(product);
  const item = {
    id,
    name: product.name,
    amount: product.amount,
  };
  res.status(201).json({ item });
};

export default {
  cadastrarProduto,
};