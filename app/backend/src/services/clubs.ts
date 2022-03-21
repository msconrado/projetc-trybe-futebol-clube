import { IId } from '../interfaces/clubsInterfaces';
import ClubsModel from '../database/models/ClubsModel';

const getAll = async () => {
  const clubs = await ClubsModel.findAll();

  return clubs;
};

const getByid = async ({ id }: IId) => {
  const clubs = await ClubsModel.findByPk(id);

  return clubs;
};

export default { getAll, getByid };
