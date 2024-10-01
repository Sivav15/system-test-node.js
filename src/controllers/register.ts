import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel"; 

interface CustomRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}



const register = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser:UserModel | null = await UserModel.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Registered.",
      });
    }

    // Hash the password
    const hashedPassword:string = await bcrypt.hash(password, 10);

    // Create a new user
    const user:UserModel = await UserModel.create({ email, password: hashedPassword });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User Registered successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "User Registration failed",
    });
  }
};

module.exports =  register;
