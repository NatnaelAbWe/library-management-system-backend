import { Request, Response } from "express";
import { register } from "../services/UserService.js";
import { Iuser } from "../models/User.js";

async function handleRegister(req: Request, res: Response) {
  const user: Iuser = req.body;

  try {
    const registeredUser = await register(user);

    res.status(201).json({
      message: "User successfully created",
      user: {
        _id: registeredUser._id,
        type: registeredUser.type,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
    });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error collection:")) {
      res.status(409).json({
        message: "user with this email alredy exist",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unable to register user at this time",
        error: error.message,
      });
    }
  }
}

export default { handleRegister };
