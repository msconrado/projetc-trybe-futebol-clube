import { NextFunction, Request, Response } from 'express';
import loginService from '../services/login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.login({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
