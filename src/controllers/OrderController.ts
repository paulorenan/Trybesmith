import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import { verifyToken, pegarIdToken } from '../schemas/authentication';
import { Retornos } from '../interface/Retornos';
import { validarProducts } from '../schemas/validations';
import OrderModel from '../models/OrderModel';

const INVALID_TOKEN = { error: 'Invalid token' };
const NOT_FOUND = { error: 'Order not found' };
const TOKEN_NOT_FOUND = { error: 'Token not found' };

const cadastrarPedido = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json(TOKEN_NOT_FOUND);
  if (verifyToken(token) === null) return res.status(401).json(INVALID_TOKEN);
  const id = pegarIdToken(token);
  const { products } = req.body;
  const validar: Retornos = validarProducts(products);
  if (validar.status !== 200) return res.status(validar.status).json({ error: validar.error });
  const result: Retornos = await OrderService.cadastrarPedido(id, products);
  const order = { userId: id, products };
  return res.status(result.status).json({ order });
};

const pegarTodosPedidos = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json(TOKEN_NOT_FOUND);
  if (verifyToken(token) === null) return res.status(401).json(INVALID_TOKEN);
  const result = await OrderModel.pegarTodosPedidos();
  return res.status(200).json(result);
};

const pegarPedidoId = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json(TOKEN_NOT_FOUND);
  if (verifyToken(token) === null) return res.status(401).json(INVALID_TOKEN);
  const { id } = req.params;
  const result = await OrderModel.pegarPedidoId(Number(id));
  if (result === null) return res.status(404).json(NOT_FOUND);
  return res.status(200).json(result);
};

export default {
  cadastrarPedido,
  pegarTodosPedidos,
  pegarPedidoId,
};