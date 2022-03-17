// import ClubModel from '../database/models/ClubsModel';
import ClubModel from '../database/models/ClubsModel';
import MatchModel from '../database/models/MatchModel';

const getAll = async () => {
  const matchs = await MatchModel.findAll({
    include: [{
      model: ClubModel,
      as: 'awayClub',
      attributes: ['clubName'],
    }, {
      model: ClubModel,
      as: 'homeClub',
      attributes: ['clubName'],
    }],
  });

  return matchs;
};

export default {
  getAll,
};
