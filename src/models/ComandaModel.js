import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Pedido from './PedidoModel';

const Comanda = sequelize.define(
  'comanda',
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

Comanda.belongsTo(Pedido, {
  as: 'pedido',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    name: 'idPedido',
    allowNull: false,
    field: 'id_pedido',
  },
});

export default Comanda;
