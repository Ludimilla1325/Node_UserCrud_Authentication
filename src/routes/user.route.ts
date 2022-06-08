import { Router } from "express";
import { createUser, getMe, getUsers, getUser } from "../controller/user";

import { authenticated, authenticatedAs } from "../middlewares/auth.middleware";
const userRouter: Router = Router();

userRouter.get("/me", [authenticated, getMe]);
userRouter.post("/", [createUser]);
userRouter.get("/", getUsers);
userRouter.get("/:id", [getUser]);

//TODO:
//userRouter.get("/", [authenticatedAs("admin"), getUsers]);
//user.delete("/", [authenticatedAs('admin'), deleteUser]);
//user.put("/", [authenticatedAs('admin'), putUser]);

export default userRouter;
