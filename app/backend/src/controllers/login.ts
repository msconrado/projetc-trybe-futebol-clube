import { NextFunction, Request, Response } from 'express';
import verifyToken from '../token/verifyToken';
import StatusCodes from '../enum/statusCode';
import loginService from '../services/login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.login({ email, password });

    if (!user) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(StatusCodes.Ok).json(user);
  } catch (error) {
    next(error);
  }
};

const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: 'Token invalid' });
    }
    const { role } = await verifyToken(authorization);

    return res.status(StatusCodes.Ok).json(role);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  user,
};
