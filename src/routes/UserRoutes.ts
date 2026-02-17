import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.put("/", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

export default router;
