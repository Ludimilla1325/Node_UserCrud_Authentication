import { RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import { UniqueConstraintError } from "sequelize";

import {
  createUser as createUserService,
  getUser as getUserService,
  getUsers as getUsersService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/user";

import { User } from "../entities/user";

import { TypedRequestBody } from "../types/request";

interface UserBody {
  name: string;
  email: string;
  password: string;
}

type RequestBody = TypedRequestBody<UserBody>;

export const createUser: RequestHandler<{ id: string }> = async (
  req: RequestBody,
  res: Response
) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password, salt);

  try {
    const newUser = await createUserService(name, email, hash);

    delete newUser["password"];
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: "This email already exist!",
      });
    }
    return res.status(500).json(err);
  }
};

export const getUsers: RequestHandler = async (
  req: RequestBody,
  res: Response
) => {
  let userList: User[] = [];
  getUsersService()
    .then((data) => {
      userList = data;
      res.json(userList);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const getMe: RequestHandler = async (
  req: RequestBody,
  res: Response
) => {
  const userId = req.userId;

  const gotMe = await getUserService(userId).catch((err) => {
    res.status(500).json(err);
  });

  if (!gotMe) {
    return res.status(404).json({ message: "Search fail. Try again!" });
  }
  return res.json(gotMe);
};

export const getUser: RequestHandler = async (
  req: RequestBody,
  res: Response
) => {
  const userId: number = +req.params.id;

  try {
    const foundUser = await getUserService(userId).catch((err) => {
      res.status(500).json(err);
    });
    if (!foundUser) {
      return res.status(404).json({ message: "Search fail. Try again!" });
    }
    return res.json(foundUser);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUser: RequestHandler = async (
  req: RequestBody,
  res: Response
) => {
  const userId: number = +req.params.id;
  const deletedUser: void | User = await deleteUserService(userId).catch(
    (err) => {
      res.status(500).json(err);
    }
  );
  if (!deletedUser) {
    return res.status(404).json({ message: "Delete fail. Try again!" });
  }
  return res.status(204);
};
