import express, { NextFunction, Response } from 'express';
import { createToken, encryptPassword, isPasswordSame } from '../auth.service';
import { UserDAL } from '../dals';
import { AuthDto, UserDto } from '../dtos';
import { customError } from '../helpers/utility';
import { RequestWithUser } from '../types/request.type';

export const authRoutes = (userDAL: UserDAL) => {
  const authRouter = express.Router({ mergeParams: true });

  authRouter.route('/login').post(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const body = request.body as unknown as AuthDto;
      const user = await userDAL.findOne({ email: body.email }, true);

      if (user && (await isPasswordSame(body.password, user.password))) {
        response.send({ token: createToken({ id: user.id, email: user.email }) });
      }

      throw customError('Invalid credentials', 401);
    } catch (err) {
      next(err);
    }
  });

  authRouter.route('/register').post(async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const userDto = request.body as unknown as UserDto;
      userDto.password = await encryptPassword(userDto.password);
      const user = await userDAL.save(userDto);
      response.send(user);
    } catch (err) {
      next(err);
    }
  });

  return authRouter;
};
