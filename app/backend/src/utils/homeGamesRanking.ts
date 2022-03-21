import { IClassification } from '../interfaces/leaderboardInterfaces';
import { Matchs } from '../interfaces/matchsInterfaces';

const winHomeHome = (club: Matchs, classification: IClassification[]) =>
  classification.forEach((team) => {
    const varTeam = team;
    if (team.name === club.homeClub.clubName) {
      varTeam.totalPoints += 3;
      varTeam.totalGames += 1;
      varTeam.totalVictories += 1;
      varTeam.goalsFavor += club.homeTeamGoals;
      varTeam.goalsOwn += club.awayTeamGoals;
      varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
      varTeam.efficiency = +(
        (varTeam.totalPoints / (varTeam.totalGames * 3)) * 100
      ).toFixed(2);
    }
  });

const winAwayHome = (club: Matchs, classification: IClassification[]) =>
  classification.forEach((team) => {
    const varTeam = team;
    if (team.name === club.homeClub.clubName) {
      varTeam.totalGames += 1;
      varTeam.totalLosses += 1;
      varTeam.goalsFavor += club.homeTeamGoals;
      varTeam.goalsOwn += club.awayTeamGoals;
      varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
      varTeam.efficiency = +(
        (varTeam.totalPoints / (varTeam.totalGames * 3)) * 100
      ).toFixed(2);
    }
  });

const tiedHome = (club: Matchs, classification: IClassification[]) =>
  classification.forEach((team) => {
    const varTeam = team;
    if (team.name === club.homeClub.clubName) {
      varTeam.totalPoints += 1;
      varTeam.totalGames += 1;
      varTeam.totalDraws += 1;
      varTeam.goalsFavor += club.homeTeamGoals;
      varTeam.goalsOwn += club.awayTeamGoals;
      varTeam.goalsBalance += club.homeTeamGoals - club.awayTeamGoals;
      varTeam.efficiency = +(
        (varTeam.totalPoints / (varTeam.totalGames * 3)) * 100
      ).toFixed(2);
    }
  });

export { winHomeHome, winAwayHome, tiedHome };
