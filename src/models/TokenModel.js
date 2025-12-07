import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Token = sequelize.define(
  'token',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Token;
