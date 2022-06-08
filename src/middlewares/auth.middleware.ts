import * as jwt from "jsonwebtoken";
import * as config from "../../config";

import { NextFunction, Request, RequestHandler, Response } from "express";
import { stringify } from "querystring";

export const authenticatedAs = (role = "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ message: "Acess denied" });
    } else {
      const tokenBody: string = token.slice(7);
      jwt.verify(
        tokenBody,
        config.JWT_SECRET,
        (err, result: { userId: string; isAdmin: boolean }) => {
          if (err || !result.userId) {
            return res.status(401).send({ message: "Access denied" });
          }
          req.userId = +result.userId;
          req.isAdmin = result.isAdmin;

          if (role === "admin") {
            return adminOnly(req, res, next);
          } else {
            next();
          }
        }
      );
    }
  };
};

export const authenticated = () => {
  return authenticatedAs("user");
};

export const adminOnly: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAdmin || !req.userId) {
    return res.status(401).send();
  }
  next();
};
