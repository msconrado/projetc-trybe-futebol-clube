export default [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 3,
    awayTeamGoals: 4,
    inProgress: 1,
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: 0,
  },
];

export const postMatchs = {
  homeTeam: 1,
  awayTeam: 3,
  homeTeamGoals: 2,
  awayTeamGoals: 4,
  inProgress: true,
};

export const TwoEqualTeams = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 4,
  inProgress: true,
};

export const inProgessFalse = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 2,
  awayTeamGoals: 4,
  inProgress: false,
};