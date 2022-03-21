import { IClassification } from '../interfaces/leaderboardInterfaces';
import { Matchs } from '../interfaces/matchsInterfaces';

const winHome = (club: Matchs, classif: IClassification[]) => classif.forEach((team) => {
  const varTeam = team;
  if (team.name === club.homeClub.clubName) {
    varTeam.totalPoints += 3;
    varTeam.totalGames += 1;
    varTeam.totalVictories += 1;
    varTeam.goalsFavor += club.homeTeamGoals;
    varTeam.goalsOwn += club.awayTeamGoals;
    varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  } if (team.name === club.awayClub.clubName) {
    varTeam.totalGames += 1;
    varTeam.totalLosses += 1;
    varTeam.goalsFavor += club.awayTeamGoals;
    varTeam.goalsOwn += club.homeTeamGoals;
    varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  }
});

const winAway = (club: Matchs, classif: IClassification[]) => classif.forEach((team) => {
  const varTeam = team;
  if (team.name === club.homeClub.clubName) {
    varTeam.totalGames += 1;
    varTeam.totalLosses += 1;
    varTeam.goalsFavor += club.homeTeamGoals;
    varTeam.goalsOwn += club.awayTeamGoals;
    varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  } if (varTeam.name === club.awayClub.clubName) {
    varTeam.totalPoints += 3;
    varTeam.totalGames += 1;
    varTeam.totalVictories += 1;
    varTeam.goalsFavor += club.awayTeamGoals;
    varTeam.goalsOwn += club.homeTeamGoals;
    varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  }
});

const tied = (club: Matchs, classif: IClassification[]) => classif.forEach((team) => {
  const varTeam = team;
  if (team.name === club.homeClub.clubName) {
    varTeam.totalPoints += 1;
    varTeam.totalGames += 1;
    varTeam.totalDraws += 1;
    varTeam.goalsFavor += club.homeTeamGoals;
    varTeam.goalsOwn += club.awayTeamGoals;
    varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  } if (team.name === club.awayClub.clubName) {
    varTeam.totalPoints += 1;
    varTeam.totalGames += 1;
    varTeam.totalDraws += 1;
    varTeam.goalsFavor += club.awayTeamGoals;
    varTeam.goalsOwn += club.homeTeamGoals;
    varTeam.goalsBalance += club.awayTeamGoals - club.homeTeamGoals;
    varTeam.efficiency = +((varTeam.totalPoints / (varTeam.totalGames * 3)) * 100).toFixed(2);
  }
});

export {
  winHome,
  winAway,
  tied,
};
