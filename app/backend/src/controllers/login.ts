import { NextFunction, Request, Response } from 'express';
import loginService from '../services/login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.login({ email, password });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
