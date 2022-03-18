import { NextFunction, Request, Response } from 'express';
import leaderboardService from '../services/leaderboard';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  const table = await leaderboardService.getAll();
};

export default { getAll };
