const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port : ${process.env.PORT}`);
});

// const tedious = require('tedious');
// const { Sequelize } = require('sequelize');
