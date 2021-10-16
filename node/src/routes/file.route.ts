import express, { NextFunction, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { RequestWithUser } from '../types/request.type';

export const fileRoutes = () => {
  const fileRouter = express.Router({ mergeParams: true });
  const baseFileDirectoryPath = path.join(__dirname, '..', 'data');

  if (!fs.existsSync(baseFileDirectoryPath)) {
    fs.mkdirSync(baseFileDirectoryPath);
  }

  fileRouter.route('/').post(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const userId = request.user?.id || '';
      const fileId = uuid();
      const userDirectoryPath = path.join(baseFileDirectoryPath, userId);

      if (!fs.existsSync(userDirectoryPath)) {
        fs.mkdirSync(userDirectoryPath);
      }

      const filePath = path.join(userDirectoryPath, fileId + '.json');
      fs.writeFileSync(filePath, JSON.stringify(request.body));

      response.status(200).json({
        id: fileId,
      });
    } catch (err) {
      next(err);
    }
  });

  fileRouter.route('/list').get(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const userId = request.user?.id || '';
      const userDirectoryPath = path.join(baseFileDirectoryPath, userId);
      const files = fs.readdirSync(userDirectoryPath).map((file) => file.replace('.json', ''));
      response.send(files);
    } catch (err) {
      next(err);
    }
  });

  fileRouter.route('/:id').get(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const userId = request.user?.id || '';
      const userDirectoryPath = path.join(baseFileDirectoryPath, userId);
      const filePath = path.join(userDirectoryPath, request.params.id + '.json');
      const data = fs.readFileSync(filePath);
      response.json(JSON.parse(data.toString()));
    } catch (err) {
      next(err);
    }
  });

  return fileRouter;
};
