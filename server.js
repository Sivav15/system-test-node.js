const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./src/routes/auth");
const chatRoute = require("./src/routes/chat");
const { sequelize } = require("./src/config/db");
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

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
// app.listen(process.env.PORT, () =>
//   console.log(`server is running on the port : ${process.env.PORT}`)
// );

sequelize
  .sync({ alter: true }) // Sync all models
  .then(() => {
    console.log("Database synced!");
    app.listen(process.env.PORT, () =>
      console.log(`server is running on the port : ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Error syncing the database:", err));
