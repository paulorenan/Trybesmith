import { Request, Response } from 'express';  
import { Retornos } from '../interface/Retornos';
import ProductService from '../services/ProductService';
import { validarAmountENome } from '../schemas/validations';
import { verifyToken } from '../schemas/authentication';

const cadastrarProduto = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token not found' });    
  if (verifyToken(token) === null) return res.status(401).json({ error: 'Invalid token' });
  const product = req.body;
  const validar: Retornos = validarAmountENome(product);
  if (validar.status !== 200) return res.status(validar.status).json({ error: validar.error });
  const pro = await ProductService.cadastrarProduto(product);
  const item = { id: pro.id, name: product.name, amount: product.amount };
  return res.status(201).json({ item });
};

const listarProdutos = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token not found' });
  if (verifyToken(token) === null) return res.status(401).json({ error: 'Invalid token' });
  const products = await ProductService.listarProdutos();
  res.status(200).json(products);
};

export default {
  cadastrarProduto,
  listarProdutos,
};