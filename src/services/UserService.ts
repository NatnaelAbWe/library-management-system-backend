import bcrypt from "bcrypt";
import { config } from "../config/index.js";

import userDao, { Iusermodel } from "../daos/userData.js";
import { Iuser } from "../models/User.js";
import { promises } from "node:dns";
import { unableToSaveError } from "../utils/LibraryErrors.js";

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
