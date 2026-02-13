import mongoose, { Schema, Document } from "mongoose";
import { Iuser } from "../models/User.js";

export interface Iusermodel extends Iuser, Document {}

const UserSchema = new Schema(
  {
    type: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<Iusermodel>("userDao", UserSchema);
