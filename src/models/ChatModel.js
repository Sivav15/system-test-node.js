const { DataTypes } = require("sequelize");

function ChatModel(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
  };

  const options = {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ["sender"],
      },
    ],
  };

  return sequelize.define("Chats", attributes, options);
}

module.exports = ChatModel;
