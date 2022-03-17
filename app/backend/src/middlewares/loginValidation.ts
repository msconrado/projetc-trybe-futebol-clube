import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/loginInterfaces';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

export default loginValidation;
