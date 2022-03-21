import { NextFunction, Request, Response } from 'express';
import leaderboardService from '../services/leaderboard';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const table = await leaderboardService.getAll();

    return res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

export default { getAll };
