// import ClubModel from '../database/models/ClubsModel';
import { ICreateMatchs } from '../interfaces/matchsInterface';
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
  return matchs;
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

export default {
  getAll,
  search,
  create,
};
