import express, { NextFunction, Response } from 'express';
import { UserDAL } from '../dals';
import { SearchParamsDto } from '../dtos';
import { RequestWithUser } from '../types/request.type';

export const userRoutes = (userDAL: UserDAL) => {
  const userRouter = express.Router({ mergeParams: true });

  userRouter.route('/').get(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const searchParams = Object.assign(new SearchParamsDto(), request.params);
      const users = await userDAL.findAll(searchParams);
      response.send(users);
    } catch (err) {
      next(err);
    }
  });

  userRouter.route('/:id').get(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const user = await userDAL.findById(request.params.id);
      response.send(user);
    } catch (err) {
      next(err);
    }
  });

  return userRouter;
};
