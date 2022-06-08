"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const authorization_route_1 = __importDefault(require("./routes/authorization.route"));
exports.app = (0, express_1.default)();
const port = 3002 || 3010;
exports.app.get("/", (req, res) => {
    res.send("Lets start!");
});
exports.app.listen(port, "0.0.0.0", () => {
    return console.log(`server is listening on ${port}`);
});
exports.app.use((0, body_parser_1.json)());
const corsOptions = {
    origin: "http://example.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.app.use((0, cors_1.default)());
exports.app.use("/user", user_route_1.default);
exports.app.use("/login", authorization_route_1.default);
exports.app.use((err, req, res, _next) => {
    res.status(500).json({ message: err.message });
});
module.exports = { app: exports.app };
//# sourceMappingURL=app.js.map