import bcrypt from "bcrypt";
import { config } from "../config";

import userDao, { Iusermodel } from "../daos/userData";
import { Iuser } from "../models/User";
import { promises } from "node:dns";

export async function register(user: Iuser): Promise<Iusermodel> {
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

    const saved = new userDao({ ...user, password: hashedPassword });

    return await saved.save();
  } catch (error: any) {
    throw new Error("Unable to create user at this time");
  }
}
