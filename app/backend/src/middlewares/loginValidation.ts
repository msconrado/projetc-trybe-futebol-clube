import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../enum/statusCode';
import { IUser } from '../interfaces/loginInterfaces';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;

  const regexValidEmail = /\S+@\S+\.\S+/;
  const validEmail = regexValidEmail.test(email);

  if (!email || !password) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'All fields must be filled' });
  }

  if (password.length < 6 || !validEmail) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'Incorrect email or password' });
  }

  next();
};

export default loginValidation;
