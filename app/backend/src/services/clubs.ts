import ClubsModel from '../database/models/ClubsModel';

const getAll = async () => {
  const clubs = await ClubsModel.findAll();

  return clubs;
};

export default { getAll };
