import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Token from './TokenModel';
import Produto from './ProdutoModel';

const Pedido = sequelize.define(
  'pedido',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantidade: {
      field: 'quantidade',
      type: DataTypes.NUMBER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

Pedido.belongsTo(Token, {
  as: 'token',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    name: 'idToken',
    allowNull: false,
    field: 'id_token',
  },
});

Pedido.belongsTo(Produto, {
  as: 'produto',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    name: 'idProduto',
    allowNull: false,
    field: 'id_produto',
  },
});

export default Pedido;
