import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import { verifyToken, pegarIdToken } from '../schemas/authentication';
import { Retornos } from '../interface/Retornos';
import { validarProducts } from '../schemas/validations';
import OrderModel from '../models/OrderModel';

const INVALID_TOKEN = { error: 'Invalid token' };
const NOT_FOUND = { error: 'Order not found' };
const TOKEN_NOT_FOUND = { error: 'Token not found' };

const cadastrarPedido = async (req: Request, res: Response): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json(TOKEN_NOT_FOUND);
    return;
  }
  if (verifyToken(req.headers.authorization) === null) {
    res.status(401).json(INVALID_TOKEN);
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

const pegarTodosPedidos = async (req: Request, res: Response): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json(TOKEN_NOT_FOUND);
    return;
  }
  if (verifyToken(req.headers.authorization) === null) {
    res.status(401).json(INVALID_TOKEN);
    return;
  }
  const result = await OrderModel.pegarTodosPedidos();
  res.status(200).json(result);
};

const pegarPedidoId = async (req: Request, res: Response): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json(TOKEN_NOT_FOUND);
    return;
  }
  if (verifyToken(req.headers.authorization) === null) {
    res.status(401).json(INVALID_TOKEN);
    return;
  }
  const { id } = req.params;
  const result = await OrderModel.pegarPedidoId(Number(id));
  if (result === null) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.status(200).json(result);
};

export default {
  cadastrarPedido,
  pegarTodosPedidos,
  pegarPedidoId,
};