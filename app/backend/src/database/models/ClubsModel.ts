import { DataTypes, Model } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class ClubModel extends Model {
  public id?: number;

  public clubName: string;
}

ClubModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'clubs',
    timestamps: false,
  },
);

ClubModel.hasMany(MatchModel, { foreignKey: 'id', as: 'matchs' });

export default ClubModel;
