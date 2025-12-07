import { Sequelize } from 'sequelize';
import 'dotenv/config';

// eslint-disable-next-line import/prefer-default-export
export const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  },
);
