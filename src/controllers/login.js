const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "You are not registered user",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User login successfull.",
      token,
      email: existingUser.email,
      id: existingUser.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "User login failed",
    });
  }
};

module.exports = login;
