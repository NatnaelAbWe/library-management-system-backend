import bcrypt from "bcrypt";
import { config } from "../config/index.js";

import userDao, { Iusermodel } from "../daos/userData.js";
import { Iuser } from "../models/User.js";
import { promises } from "node:dns";
import { unableToSaveError } from "../utils/LibraryErrors.js";
import { InvalidUserNameOrPasswordError } from "../utils/LibraryErrors.js";
import { UserDoesNotExistError } from "../utils/LibraryErrors.js";

export async function register(user: Iuser): Promise<Iusermodel> {
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

    const saved = new userDao({ ...user, password: hashedPassword });

    return await saved.save();
  } catch (error: any) {
    throw new unableToSaveError(error.message);
  }
}

export async function login(credential: {
  email: string;
  password: string;
}): Promise<Iusermodel> {
  const { email, password } = credential;
  try {
    const user = await userDao.findOne({ email });

    if (!user) {
      throw new InvalidUserNameOrPasswordError("Invalid username or password");
    } else {
      const validatePassword: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (validatePassword) {
        return user;
      } else {
        throw new InvalidUserNameOrPasswordError("Invalid user or Password");
      }
    }
  } catch (error: any) {
    throw Error;
  }
}

export async function findAllUsers(): Promise<Iusermodel[]> {
  try {
    const users = await userDao.find();
    return users;
  } catch (error) {
    return [];
  }
}

export async function findUserById(userId: string): Promise<Iusermodel> {
  try {
    const user = await userDao.findById(userId);

    if (user) return user;

    throw new UserDoesNotExistError("user does not exist with this id");
  } catch (error: any) {
    throw error;
  }
}

export async function modifyUser(user: Iusermodel): Promise<Iusermodel> {
  try {
    let id = await userDao.findByIdAndUpdate(user._id, user, { new: true });
    if (!id) {
      throw new UserDoesNotExistError("user does not exist with this id");
    }
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function removeUser(userId: string): Promise<string> {
  try {
    await userDao.findByIdAndDelete(userId);
    if (!userId) {
      throw new UserDoesNotExistError("user with this id does not exist");
    }
    return "user deleted sucessfully";
  } catch (error) {
    throw error;
  }
}
