import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import { verifyToken, pegarIdToken } from '../schemas/authentication';
import { Retornos } from '../interface/Retornos';
import { validarProducts } from '../schemas/validations';

const cadastrarPedido = async (req: Request, res: Response): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Token not found' });
    return;
  }
  if (verifyToken(req.headers.authorization) === null) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  const id = pegarIdToken(req.headers.authorization);
  const { products } = req.body;
  const validar: Retornos = validarProducts(products);
  if (validar.status !== 200) {
    res.status(validar.status).json({ error: validar.error });
    return;
  }
  const result: Retornos = await OrderService.cadastrarPedido(id, products);
  const order = { userId: id, products };
  res.status(result.status).json({ order });
};

export default {
  cadastrarPedido,
};