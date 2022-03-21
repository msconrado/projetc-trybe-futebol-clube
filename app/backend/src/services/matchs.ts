import { Op } from 'sequelize';
import { IHomeAway, IId, IUpdateGols } from '../interfaces/clubsInterfaces';
import { ICreateMatchs, Matchs } from '../interfaces/matchsInterfaces';
import ClubModel from '../database/models/ClubsModel';
import MatchModel from '../database/models/MatchModel';

const getAll = async () => {
  const matchs = await MatchModel.findAll({
    include: [
      {
        model: ClubModel,
        as: 'awayClub',
        attributes: ['clubName'],
      },
      {
        model: ClubModel,
        as: 'homeClub',
        attributes: ['clubName'],
      },
    ],
  });

  return matchs as Matchs[];
};

const search = async (query: boolean) => {
  const matchs = await MatchModel.findAll({
    where: {
      inProgress: query,
    },
    include: [
      {
        model: ClubModel,
        as: 'awayClub',
        attributes: ['clubName'],
      },
      {
        model: ClubModel,
        as: 'homeClub',
        attributes: ['clubName'],
      },
    ],
  });

  return matchs;
};

const getByClub = async ({ homeTeam, awayTeam }: IHomeAway) => {
  const clubs = await ClubModel.findAll({
    where: {
      [Op.or]: [{ id: homeTeam }, { id: awayTeam }],
    },
  });

  if (!clubs[0] || !clubs[1]) return false;

  return true;
};

const create = async ({
  homeTeam,
  awayTeam,
  homeTeamGoals,
  awayTeamGoals,
  inProgress,
}: ICreateMatchs) => {
  const matchs = await MatchModel.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });

  return matchs;
};

const updateInProgress = async ({ id }: IId) => {
  await MatchModel.update(
    { inProgress: false },
    { where: { id } },
  );

  return true;
};

const updateGoals = async ({ homeTeamGoals, awayTeamGoals, id }: IUpdateGols) => {
  await MatchModel.update(
    { homeTeamGoals,
      awayTeamGoals,
    },
    { where: { id } },
  );

  return true;
};

export default {
  getAll,
  search,
  create,
  getByClub,
  updateInProgress,
  updateGoals,
};
