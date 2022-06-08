"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.authenticated = exports.authenticatedAs = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config = __importStar(require("../../config"));
const authenticatedAs = (role = "user") => {
    return (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({ message: "Acess denied" });
        }
        else {
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody, config.JWT_SECRET, (err, result) => {
                if (err || !result.userId) {
                    return res.status(401).send({ message: "Access denied" });
                }
                req.userId = +result.userId;
                req.isAdmin = result.isAdmin;
                if (role === "admin") {
                    return (0, exports.adminOnly)(req, res, next);
                }
                else {
                    next();
                }
            });
        }
    };
};
exports.authenticatedAs = authenticatedAs;
const authenticated = () => {
    return (0, exports.authenticatedAs)("user");
};
exports.authenticated = authenticated;
const adminOnly = (req, res, next) => {
    if (!req.isAdmin || !req.userId) {
        return res.status(401).send();
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=auth.middleware.js.map