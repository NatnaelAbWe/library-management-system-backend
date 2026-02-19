import { Request, Response } from "express";
import {
  findAllBooks,
  registerBook,
  modifyBook,
  removeBook,
} from "../services/BookService.js";
import { IBook } from "../models/Book.js";
import { IBookModel } from "../daos/BookDao.js";
import { BookDoesNotExistError } from "../utils/LibraryErrors.js";

async function getAllBooks(req: Request, res: Response) {
  try {
    let books = await findAllBooks();
    res
      .status(200)
      .json({ message: "Retrieved all books", count: books.length, books });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Unable to retrieve books at this time", error });
  }
}

async function createBook(req: Request, res: Response) {
  let book = req.body;
  try {
    let savedBook = await registerBook(book);
    res.status(201).json({ message: "Book created successfully", savedBook });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Unable to save book at this time", error });
  }
}

async function updateBook(req: Request, res: Response) {
  let book = req.body;
  try {
    let updatedBook = await modifyBook(book);
    res.status(202).json({ message: "Book updated successfully", updatedBook });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError) {
      res
        .status(404)
        .json({ message: "can not update a book that does not exist", error });
    } else {
      res
        .status(500)
        .json({ message: "Unable to update book at this time", error });
    }
  }
}

async function deleteBook(req: Request, res: Response) {
  let { barcode } = req.params;
  try {
    if (typeof barcode === "string") {
      let message = await removeBook(barcode);
      res.status(202).json({ message });
    }
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError) {
      res
        .status(404)
        .json({ message: "can not delete a book that does not exist", error });
    }
    res
      .status(500)
      .json({ message: "Unable to delete book at this time", error });
  }
}

export default { getAllBooks, createBook, updateBook, deleteBook };
