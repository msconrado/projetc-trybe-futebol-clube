import { DataTypes, Model } from 'sequelize';
import db from '.';
// import ClubModel from './ClubModel';

class MatchModel extends Model {
  public id?: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

MatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'clubs',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'clubs',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inTrogress: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matchs',
    timestamps: false,
  },
);

// MatchModel.hasOne(ClubModel, { foreignKey: 'awayTeam', as: 'clubs' });

export default MatchModel;
