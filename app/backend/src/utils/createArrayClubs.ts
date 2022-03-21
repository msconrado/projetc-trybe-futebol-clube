import ClubModel from '../database/models/ClubsModel';
import { IClassification } from '../interfaces/leaderboardInterfaces';

const createArrayClubs = (
  clubes: ClubModel[],
  classification: IClassification[],
) => {
  clubes.forEach((clube) =>
    classification.push({
      name: clube.clubName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 100,
    }));
};

export default createArrayClubs;
