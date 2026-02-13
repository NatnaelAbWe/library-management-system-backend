import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config/index.js";
import mongoose from "mongoose";
import { registerRoutes } from "./routes/index.js";

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

    // routes

    registerRoutes(server);

    // start your server
    server.listen(port, () => {
      console.log("your app is running on port: ", port);
    });
  } catch {
    console.log("could not make a connection to the database");
  }
})();
