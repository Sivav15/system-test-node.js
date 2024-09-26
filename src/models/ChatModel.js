const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ChatModel = sequelize.define("Chats", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ChatModel;
