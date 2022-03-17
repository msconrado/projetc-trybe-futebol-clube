import { NextFunction, Request, Response } from 'express';
import verifyToken from '../token/verifyToken';
import StatusCodes from '../enum/statusCode';

const matchsTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'Token invalid' });
  }

  const { role } = await verifyToken(authorization);

  if (role !== 'admin') {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'Unauthorized person' });
  }

  next();
};

const matchsClubsValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'Equal clubs in the same match' });
  }

  next();
};

export { matchsTokenValidation, matchsClubsValidation };
