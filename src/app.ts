import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";

import userRoutes from "./routes/user.route";
import authorizationRouter from "./routes/authorization.route";

export const app = express();

const port: number = 3002 || 3010;

app.get("/", (req, res) => {
  res.send("Lets start!");
});

app.listen(port, "0.0.0.0", () => {
  return console.log(`server is listening on ${port}`);
});

app.use(json());

const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.use("/user", userRoutes);
app.use("/login", authorizationRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

module.exports = { app };
