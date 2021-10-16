import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';
import { customError } from './helpers/utility';

export const encryptPassword = async (password: string) => {
  if (!password) {
    throw customError("Password can't be empty", 404);
  }
  return bcrypt.hash(password, 10);
};

export const isPasswordSame = async (password: string, encryptedPassword: string) => {
  if (!password) {
    throw customError("Password can't be empty", 404);
  }
  return bcrypt.compare(password, encryptedPassword);
};

export const createToken = ({ id, email }: { id: string; email: string }) => {
  return jwt.sign({ id, email }, config.SECRET_KEY, { expiresIn: '1h' });
};

const getToken = (req: Request) => {
  let token = req.headers['authorization'];
  if (token) {
    token = token.replace('Bearer ', '');
  }

  return token;
};

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = getToken(req);

  if (!token) {
    throw customError('Invalid Token', 401);
  }
  try {
    const decodedUser = jwt.verify(token.replace('Bearer ', ''), config.SECRET_KEY);
    req.user = decodedUser;
  } catch (err) {
    throw customError('Invalid Token', 401);
  }
  return next();
};
