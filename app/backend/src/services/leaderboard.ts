import { Matchs } from '../interfaces/matchsInterfaces';
import matchsService from './matchs';
import clubService from './clubs';
import { IClassification } from '../interfaces/leaderboardInterfaces';
import createArrayClubs from '../utils/createArrayClubs';
import sortClassification from '../utils/sortClassification';
import { tiedHome, winAwayHome, winHomeHome } from '../utils/homeGamesRanking';
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

const getAllHome = async () => {
  classification = [];
  const matchsHome = await matchsService.getAll();
  const clubsHome = await clubService.getAll();

  createArrayClubs(clubsHome, classification);

  matchsHome.forEach((matchHome: Matchs) => {
    if (matchHome.inProgress) return;

    const result = matchHome.homeTeamGoals - matchHome.awayTeamGoals;

    if (result === 0) return tiedHome(matchHome, classification);
    if (result > 0) return winHomeHome(matchHome, classification);

    return winAwayHome(matchHome, classification);
  });

  return sortClassification(classification);
};

const getAllAway = async () => {
  classification = [];
  const matchsHome = await matchsService.getAll();
  const clubsHome = await clubService.getAll();

  createArrayClubs(clubsHome, classification);

  matchsHome.forEach((matchAway: Matchs) => {
    if (matchAway.inProgress) return;

    const result = matchAway.homeTeamGoals - matchAway.awayTeamGoals;

    if (result === 0) return tiedAway(matchAway, classification);
    if (result > 0) return winHomeAway(matchAway, classification);

    return winAwayAway(matchAway, classification);
  });

  return sortClassification(classification);
};

export default {
  getAll,
  getAllHome,
  getAllAway,
};
