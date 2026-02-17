import express from "express";
import AuthController from "../controllers/AuthController.js";
import { Schemas, ValidateSchema } from "../middlewares/validation.js";
import { valid } from "joi";

const router = express.Router();

router.post(
  "/register",
  ValidateSchema(Schemas.user.create, "body"),
  AuthController.handleRegister,
);

router.post(
  "/login",
  ValidateSchema(Schemas.user.login, "body"),
  AuthController.handleLogin,
);
export default router;
