import { Request, Response } from "express";
import { register } from "../services/UserService.js";
import { Iuser } from "../models/User.js";
import { login } from "../services/UserService.js";
import { Iusermodel } from "../daos/userData.js";
import { InvalidUserNameOrPasswordError } from "../utils/LibraryErrors.js";

async function handleRegister(req: Request, res: Response) {
  const user: Iuser = req.body;

  try {
    const registeredUser: Iusermodel = await register(user);

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

async function handleLogin(req: Request, res: Response) {
  const credentials = req.body;

  try {
    const loginCheck: Iusermodel = await login(credentials);
    res.status(200).json({
      messge: "user logged in sucessfully",
      user: {
        _id: loginCheck._id,
        type: loginCheck.type,
        firstName: loginCheck.firstName,
        lastName: loginCheck.lastName,
        email: loginCheck.email,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidUserNameOrPasswordError) {
      res.status(401).json({
        message: "unable to login the user at this time",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "unable to login user at this time",
        error: error.message,
      });
    }
  }
}

export default { handleRegister, handleLogin };
