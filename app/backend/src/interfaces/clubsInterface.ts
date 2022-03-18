export interface IId {
  id: string;
}

export interface IUpdateGols extends IId {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
export interface IHomeAway {
  homeTeam: string;
  awayTeam: string;
}
