import express from "express";
import {
  getLibraryCard,
  createLibraryCard,
} from "../controllers/LibraryCardController.js";
import { Schemas, ValidateSchema } from "../middlewares/validation.js";

const router = express.Router();

router.get(
  "/:cardId",
  ValidateSchema(Schemas.libraryCard.get, "params"),
  getLibraryCard,
);
router.post(
  "/",
  ValidateSchema(Schemas.libraryCard.create, "body"),
  createLibraryCard,
);

export default router;
