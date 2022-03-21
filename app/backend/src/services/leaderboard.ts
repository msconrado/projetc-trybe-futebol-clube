import { Matchs } from '../interfaces/matchsInterfaces';
import matchsService from './matchs';
import clubService from './clubs';
import { IClassification } from '../interfaces/leaderboardInterfaces';
import createArrayClubs from '../utils/createArrayClubs';
import sortClassification from '../utils/sortClassification';
import { winHome, winAway, tied } from '../utils/gamesRanking';

let classification: IClassification[] = [];

const getAll = async () => {
  classification = [];
  const matchs = await matchsService.getAll();
  const clubs = await clubService.getAll();

  createArrayClubs(clubs, classification);

  matchs.forEach((match: Matchs) => {
    if (match.inProgress) return;

    const result = match.homeTeamGoals - match.awayTeamGoals;
    if (result === 0) return tied(match, classification);
    if (result > 0) return winHome(match, classification);
    return winAway(match, classification);
  });

  return sortClassification(classification);
};

export default {
  getAll,
};
