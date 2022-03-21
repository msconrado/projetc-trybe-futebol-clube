import { IClassification } from '../interfaces/leaderboardInterfaces';
import { Matchs } from '../interfaces/matchsInterfaces';

const winHomeAway = (club: Matchs, classif: IClassification[]) =>
  classif.forEach((team) => {
    const varTeam = team;
    if (team.name === club.awayClub.clubName) {
      varTeam.totalGames += 1;
      varTeam.totalLosses += 1;
      varTeam.goalsFavor += club.awayTeamGoals;
      varTeam.goalsOwn += club.homeTeamGoals;
      varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
      varTeam.efficiency = +(
        (varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
    }
  });

const winAwayAway = (club: Matchs, classif: IClassification[]) =>
  classif.forEach((team) => {
    const varTeam = team;
    if (varTeam.name === club.awayClub.clubName) {
      varTeam.totalPoints += 3;
      varTeam.totalGames += 1;
      varTeam.totalVictories += 1;
      varTeam.goalsFavor += club.awayTeamGoals;
      varTeam.goalsOwn += club.homeTeamGoals;
      varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
      varTeam.efficiency = +(
        (varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
    }
  });

const tiedAway = (club: Matchs, classif: IClassification[]) =>
  classif.forEach((team) => {
    const varTeam = team;
    if (team.name === club.awayClub.clubName) {
      varTeam.totalPoints += 1;
      varTeam.totalGames += 1;
      varTeam.totalDraws += 1;
      varTeam.goalsFavor += club.awayTeamGoals;
      varTeam.goalsOwn += club.homeTeamGoals;
      varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
      varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
    }
  });

export { winHomeAway, winAwayAway, tiedAway };
