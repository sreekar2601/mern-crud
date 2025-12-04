import { RequestHandler } from "express";
import UserModel from "../models/users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.session.userId;

  try {
    if (!authenticatedUser) {
      throw createHttpError(401, "User not Authenticated");
    }
    const user = await UserModel.findById(authenticatedUser)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
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
  console.log("Hello");

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

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameter Missing");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid Credentials");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw createHttpError(401, "Invalid Credentials");
    }

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
