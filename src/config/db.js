const { Sequelize } = require("sequelize");
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");
const ChatModel = require("../models/ChatModel");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    logging: false,
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};
db.Users = UserModel(sequelize);
db.Chats = ChatModel(sequelize);
// // sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
