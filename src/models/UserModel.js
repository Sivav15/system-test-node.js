const { DataTypes } = require("sequelize");

function UserModel(sequelize) {
  const attributes = {
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
  };

  const options = {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  };

  return sequelize.define("Users", attributes, options);
}

module.exports = UserModel;
