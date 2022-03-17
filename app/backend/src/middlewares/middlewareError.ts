import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import StatusCodes from '../enum/statusCode';

const errorMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err.toString());

  return res
    .status(StatusCodes.InternalServerError)
    .json({ Error: err.toString() });
};

export default errorMiddleware;
