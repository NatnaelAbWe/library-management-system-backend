import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = Number(process.env.PORT) || 8000;

const server: Express = express();

server.use(express.json());
server.use(cors());

// health route
server.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "The sever is running properly" });
});

// start your server
server.listen(port, () => {
  console.log("your app is running on port: ", port);
});
