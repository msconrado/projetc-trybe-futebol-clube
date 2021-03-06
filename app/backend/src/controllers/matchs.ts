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

const notClubs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    const notClub = await matchsService.getByClub({ homeTeam, awayTeam });

    if (!notClub) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: 'There is no team with such id!' });
    }

    next();
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

    return res.status(StatusCodes.Created).json(match);
  } catch (error) {
    next(error);
  }
};

const updateInProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await matchsService.updateInProgress({ id });

    return res.status(StatusCodes.Ok).json({ message: 'Match finished!!' });
  } catch (error) {
    next(error);
  }
};

const updateGoals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    await matchsService.updateGoals({ homeTeamGoals, awayTeamGoals, id });

    return res
      .status(StatusCodes.Ok)
      .json({ scoreboard: {
        idMatch: +id,
        homeTeam: homeTeamGoals,
        awayTeam: awayTeamGoals },
      });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  create,
  notClubs,
  updateInProgress,
  updateGoals,
};
