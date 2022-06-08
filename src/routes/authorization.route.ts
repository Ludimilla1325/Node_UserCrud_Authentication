import { Router } from "express";
import { getLogin } from "../controller/authorization.controller";
const authorizationRouter: Router = Router();

authorizationRouter.post("/", [getLogin]);

export default authorizationRouter;
