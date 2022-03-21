import { IClassification } from '../interfaces/leaderboardInterfaces';

const sortClassification = (classification: IClassification[]) =>
  classification.sort((TeamA, TeamB) => {
    if (TeamA.totalPoints < TeamB.totalPoints) return 1;
    if (TeamA.totalPoints > TeamB.totalPoints) return -1;
    if (TeamA.totalVictories < TeamB.totalVictories) return 1;
    if (TeamA.totalVictories > TeamB.totalVictories) return -1;
    if (TeamA.goalsBalance < TeamB.goalsBalance) return 1;
    if (TeamA.goalsBalance > TeamB.goalsBalance) return -1;
    if (TeamA.goalsFavor < TeamB.goalsFavor) return 1;
    if (TeamA.goalsFavor > TeamB.goalsFavor) return -1;
    if (TeamA.goalsOwn < TeamB.goalsOwn) return 1;
    if (TeamA.goalsOwn > TeamB.goalsOwn) return -1;
    return 0;
  });

export default sortClassification;
