import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Administrador = sequelize.define(
  'administrador',
  {
    cpf: {
      field: 'cpf',
      type: DataTypes.NUMERIC,
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

export default Administrador;
