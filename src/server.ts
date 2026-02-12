import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config";
import mongoose from "mongoose";

dotenv.config();
const port = config.server.port;

const server: Express = express();

server.use(express.json());
server.use(cors());

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("connection to mongodb sucessfull!!");

    // health route
    server.get("/health", (req: Request, res: Response) => {
      res.status(200).json({ message: "The sever is running properly" });
    });

    // start your server
    server.listen(port, () => {
      console.log("your app is running on port: ", port);
    });
  } catch {
    console.log("could not make a connection to the database");
  }
})();
