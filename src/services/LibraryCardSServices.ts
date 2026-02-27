import LibraryCardDao, { ILibraryCardModel } from "../daos/LibrsrCardDao.js";

import { ILibraryCard } from "../models/LibraryCard.js";
import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors.js";

export async function registerLibraryCard(
  card: ILibraryCard,
): Promise<ILibraryCardModel> {
  try {
    const savedCard = new LibraryCardDao(card);
    const result = await savedCard.save();
    return result;
  } catch (error: any) {
    const existingCard = await LibraryCardDao.findOne({ user: card.user });

    if (existingCard) {
      return existingCard;
    }

    // If it wasn't a duplicate error, it's a real DB issue (connection, validation, etc.)
    console.error("Critical Service Error:", error.message);
    throw error;
  }
}

export async function findLibraryCard(
  libraryCardId: string,
): Promise<ILibraryCardModel> {
  try {
    let card = await LibraryCardDao.findOne({ _id: libraryCardId }).populate(
      "user",
    );
    if (card) return card;

    throw new LibraryCardDoesNotExistError(
      "the library card spacified does not exist",
    );
  } catch (error: any) {
    throw error;
  }
}
