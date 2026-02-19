import { Express, Request, Response } from "express";
import authRoutes from "./AuthRoutes.js";
import userRoutes from "./UserRoutes.js";
import bookRoutes from "./BookRoutes.js";
export function registerRoutes(server: Express) {
  server.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "The sever is running properly" });
  });

  server.use("/auth", authRoutes);
  server.use("/users", userRoutes);
  server.use("/book", bookRoutes);
}
