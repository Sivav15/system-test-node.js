const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });
    res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User Registered successfull.",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "User Registered failed",
    });
  }
};

module.exports = register;
