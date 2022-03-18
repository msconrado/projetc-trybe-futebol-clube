import { NextFunction, Request, Response } from 'express';
import verifyToken from '../token/verifyToken';
import StatusCodes from '../enum/statusCode';

const matchsTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    await verifyToken(authorization as string);

    next();
  } catch (error) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
};

const matchsClubsValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam, inProgress } = req.body;

    if (homeTeam === awayTeam) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (inProgress !== true) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: 'There is no team with such id!' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { matchsTokenValidation, matchsClubsValidation };
