import cors from 'cors';
import express from 'express';
import { appRoutes } from './app-routes';

export default function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  appRoutes(app);

  return app;
}
