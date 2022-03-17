import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../enum/statusCode';
import matchsService from '../services/matchs';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matchs = await matchsService.getAll();

    return res.status(StatusCodes.Ok).json(matchs);
  } catch (error) {
    next(error);
  }
};
export default {
  getAll,
};
