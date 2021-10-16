import { Express } from 'express';
import { authRoutes, fileRoutes, userRoutes } from './routes';
import { userDALFactory } from './dals';
import { verifyToken } from './auth.service';

export const appRoutes = (app: Express) => {
  const userFactory = userDALFactory();

  app.use('/api/auth', authRoutes(userFactory));
  app.use('/api/user', verifyToken, userRoutes(userFactory));
  app.use('/api/file', verifyToken, fileRoutes());
};
