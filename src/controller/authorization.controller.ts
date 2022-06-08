import { RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as config from "../../config";
import { getUserByEmail as getUserByEmailService } from "../services/user";
import { User } from "../entities/user";

import { TypedRequestBody } from "../types/request";

interface LoginBody {
  password: string;
  email: string;
}

type RequestBody = TypedRequestBody<LoginBody>;

export const getLogin: RequestHandler = async (
  req: RequestBody,
  res: Response
) => {
  const { email, password } = req.body;

  const user: User = await getUserByEmailService(email);

  if (!user) {
    return res.status(401).send();
  }

  const result: boolean = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(401).send();
  }

  if (result) {
    const token: string = jwt.sign(
      {
        email: user.email,
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      config.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const date: Date = new Date();
    date.setHours(date.getHours() + 24);
    return res.status(200).json({ token, expiresIn: date.getTime() });
  }
};
