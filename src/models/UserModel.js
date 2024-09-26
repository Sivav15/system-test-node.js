const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const UserModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Keeps the table name as 'User'
    timestamps: false, // Disables createdAt and updatedAt fields
    indexes: [
      {
        unique: true,
        fields: ["email"], // Define the unique constraint via an index
      },
    ],
  }
);

module.exports = UserModel;
