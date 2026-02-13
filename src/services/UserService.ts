import bcrypt from "bcrypt";
import { config } from "../config/index.js";

import userDao, { Iusermodel } from "../daos/userData.js";
import { Iuser } from "../models/User.js";
import { promises } from "node:dns";
import { unableToSaveError } from "../utils/LibraryErrors.js";
import { InvalidUserNameOrPasswordError } from "../utils/LibraryErrors.js";

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
}): Promise<Iuser> {
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
