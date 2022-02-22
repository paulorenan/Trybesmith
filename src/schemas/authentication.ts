import jwt from 'jsonwebtoken';
import { UserId } from '../interface/UserId';

const secret = 'secret';

const createToken = (user: UserId): string => {
  const token = jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: '1d',
  });
  return token;
};

export default {
  createToken,
};