import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Categoria = sequelize.define(
  'categoria',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Categoria;
