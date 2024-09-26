const db = require("../config/db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.Users.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = db.Users.create({ email, password: hashedPassword });
    res.status(201).json({
      user,
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
