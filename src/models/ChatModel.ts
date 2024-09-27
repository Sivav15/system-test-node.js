import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class ChatModel extends Model {
  public id!: string; 
  public message!: string; 
  public sender!: string; 

  public readonly createdAt!: Date; 
  public readonly updatedAt!: Date; 
}

ChatModel.init(
  {
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
  },
  {
    sequelize,
    modelName: "Chats",
  }
);

export default ChatModel;
