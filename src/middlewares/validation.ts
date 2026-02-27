import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { Iuser } from "../models/User.js";
import { Iusermodel } from "../daos/userData.js";
import { IBook } from "../models/Book.js";
import { IBookModel } from "../daos/BookDao.js";
import { ILibraryCard } from "../models/LibraryCard.js";
import { ILoanRecord } from "../models/LoanRecords.js";
import { ILoanRecordModel } from "../daos/LoanRecordDao.js";

export function ValidateSchema(schema: ObjectSchema, property: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (property) {
        case "query":
          await schema.validateAsync(req.query); // Changed to validateAsync for consistency
          break;
        case "params":
          await schema.validateAsync(req.params);
          break;
        default:
          await schema.validateAsync(req.body);
      }
      next();
    } catch (error) {
      return res.status(422).json({
        message: "Object validation failed, please include a valid object",
      });
    }
  };
}

export const Schemas = {
  user: {
    create: Joi.object<Iuser>({
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().required(),
    }),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().required(),
    }),
    userId: Joi.object<{ userId: string }>({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<Iusermodel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
        .required(),
      password: Joi.string(),
    }).unknown(true),
  },
  // Moved book out of user to the top level of Schemas
  book: {
    create: Joi.object<IBook>({
      barcode: Joi.string()
        .regex(/^(97(8|9))?\d{9}(\d|X)$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }),
    update: Joi.object<IBookModel>({
      _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      barcode: Joi.string()
        .regex(/^(97(8|9))?\d{9}(\d|X)$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }).unknown(true),
    delete: Joi.object({
      barcode: Joi.string()
        .regex(/^(97(8|9))?\d{9}(\d|X)$/)
        .required(),
    }),
  },
  libraryCard: {
    create: Joi.object<ILibraryCard>({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    get: Joi.object<{ cardId: string }>({
      cardId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
  loan: {
    create: Joi.object<ILoanRecord>({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      // dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      item: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<ILoanRecordModel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      // dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      item: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    query: Joi.object<{ property: string; value: string | Date }>({
      property: Joi.string()
        .valid(
          "_id",
          "status",
          "loanedDate",
          "dueDate",
          "returnedDate",
          "patron",
          "employeeOut",
          "employeeIn",
          "item",
        )
        .required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
