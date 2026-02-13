import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", AuthController.handleRegister);
export default router;
