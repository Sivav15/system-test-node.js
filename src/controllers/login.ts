import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel"; 

interface JwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const login = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    

    const existingUser:UserModel | null = await UserModel.findOne({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "You are not a registered user",
      });
    }

    const isValidPassword:boolean = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const token = jwt.sign(
      { id: existingUser.id } as JwtPayload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "User login successful.",
      token,
      email: existingUser.email,
      id: existingUser.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "User login failed. Please try again.",
    });
  }
};

module.exports = login;

