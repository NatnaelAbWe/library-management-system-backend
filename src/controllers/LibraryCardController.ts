import { Request, Response } from "express";
import {
  registerLibraryCard,
  findLibraryCard,
} from "../services/LibraryCardSServices.js";
import { ILibraryCard } from "../models/LibraryCard.js";

export async function getLibraryCard(req: Request, res: Response) {
  const { cardId } = req.params;
  if (typeof cardId !== "string") {
    return res.status(400).json({ message: "Invalid cardId parameter" });
  }
  try {
    let libraryCard = await findLibraryCard(cardId);
    res.status(200).json({ message: "retrieved the users card", libraryCard });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve the library card" });
  }
}

export async function createLibraryCard(req: Request, res: Response) {
  const card: ILibraryCard = req.body;
  try {
    let libraryCard = await registerLibraryCard(card);
    // Return the _id specifically to match your Redux string expectation
    res.status(201).json({
      message: "Generated library card for user",
      libraryCard: libraryCard._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to create library card at this time" });
  }
}
