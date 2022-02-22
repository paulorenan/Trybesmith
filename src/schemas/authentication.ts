import jwt from 'jsonwebtoken';
import { UserId } from '../interface/User';

const secret = 'secret';

const jwtConfig = {
  expiresIn: '7d',
};

const createToken = (user: UserId): string => {
  const token: string = jwt.sign({ id: user.id, username: user.username }, secret, jwtConfig);
  return token;
};

const verifyToken = (token: string): UserId | null => {
  try {
    const decoded: UserId = jwt.verify(token, secret) as UserId;
    return decoded;
  } catch (error) {
    return null;
  }
};

const pegarIdToken = (token: string): number => {
  const decoded: UserId = jwt.verify(token, secret) as UserId;
  return decoded.id;
};

export {
  createToken,
  verifyToken,
  pegarIdToken,
};