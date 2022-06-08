"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_controller_1 = require("../controller/authorization.controller");
const authorizationRouter = (0, express_1.Router)();
authorizationRouter.post("/", [authorization_controller_1.getLogin]);
exports.default = authorizationRouter;
//# sourceMappingURL=authorization.route.js.map