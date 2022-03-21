import { NextFunction, Request, Response } from 'express';
import leaderboardService from '../services/leaderboard';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const table = await leaderboardService.getAll();
    leaderboardService.getAllHome();
    leaderboardService.getAllAway();

    return res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

const getAllHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tableHome = await leaderboardService.getAllHome();
    await leaderboardService.getAll();
    await leaderboardService.getAllAway();

    return res.status(200).json(tableHome);
  } catch (error) {
    next(error);
  }
};

const getAllAway = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tableAway = await leaderboardService.getAllAway();
    await leaderboardService.getAll();
    await leaderboardService.getAllHome();

    return res.status(200).json(tableAway);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getAllHome, getAllAway };
