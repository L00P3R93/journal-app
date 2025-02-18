import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import pg from 'pg';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
})

export default sequelize