import MatchModel from '../database/models/MatchModel';

export interface ICreateMatchs {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface Matchs extends MatchModel {
  awayClub: {
    clubName: string;
  };
  homeClub: {
    clubName: string;
  };
}
