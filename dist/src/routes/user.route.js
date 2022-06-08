"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/me", [auth_middleware_1.authenticated, user_1.getMe]);
userRouter.post("/", [user_1.createUser]);
userRouter.get("/", user_1.getUsers);
userRouter.get("/:id", [user_1.getUser]);
//TODO:
//userRouter.get("/", [authenticatedAs("admin"), getUsers]);
//user.delete("/", [authenticatedAs('admin'), deleteUser]);
//user.put("/", [authenticatedAs('admin'), putUser]);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map