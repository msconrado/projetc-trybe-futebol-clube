import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err.toString());

  return res
    .status(500)
    .json({ Error: err.toString() });
};

export default errorMiddleware;
