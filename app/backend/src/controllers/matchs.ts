import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../enum/statusCode';
import matchsService from '../services/matchs';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.query;
    let query;
    let matchs;

    if (!inProgress) matchs = await matchsService.getAll();
    else {
      if (inProgress === 'true') query = true;
      else query = false;

      matchs = await matchsService.search(query);
    }

    return res.status(StatusCodes.Ok).json(matchs);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const match = await matchsService.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return res.status(StatusCodes.Ok).json(match);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  create,
};
