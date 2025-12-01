import { RequestHandler } from "express";
import UserModel from "../models/users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const rawPassword = req.body.password;

  try {
    if (!username || !email || !rawPassword) {
      throw createHttpError(400, "Parameters is required");
    }
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) {
      throw createHttpError(400, "Username already exists");
    }
    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(400, "Email already exists");
    }
    const hashPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
