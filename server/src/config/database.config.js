import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_CONNECTION, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
  logging: false,
});


export const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    return "Postgres connected ✅"; // return message
  } catch (err) {
    throw new Error("❌ DB connection error: " + err.message);
  }
};