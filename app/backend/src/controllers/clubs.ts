import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../enum/statusCode';
import clubsService from '../services/clubs';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await clubsService.getAll();

    return res.status(StatusCodes.Ok).json(clubs);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const clubs = await clubsService.getById({ id });

    return res.status(StatusCodes.Ok).json(clubs);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
};
