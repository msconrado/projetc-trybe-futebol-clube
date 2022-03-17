import MatchModel from '../database/models/MatchModel';

const getAll = async () => {
  const matchs = await MatchModel.findAll();

  return matchs;
};

export default {
  getAll,
};
