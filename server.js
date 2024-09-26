const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./src/routes/auth");
const chatRoute = require("./src/routes/chat");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use((err, res, req, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port : ${process.env.PORT}`);
});

// const tedious = require('tedious');
// const { Sequelize } = require('sequelize');
