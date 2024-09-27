import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth";
import chatRoute from "./routes/chat";
import { sequelize } from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Sync the database and start the server
sequelize
  .sync({ alter: true }) // Sync all models
  .then(() => {
    console.log("Database synced!");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on the port: ${process.env.PORT}`)
    );
  })
  .catch((err: Error) => console.error("Error syncing the database:", err));

// Set up routes
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);




