import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class UserModel extends Model {
  public id!: string;      // UUID
  public email!: string;
  public password!: string;
}


UserModel.init(
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
    sequelize,             
    tableName: "Users",    
    freezeTableName: true,
    timestamps: false,     
    indexes: [
      {
        unique: true,
        fields: ["email"], 
      },
    ],
  }
);

export default UserModel;
