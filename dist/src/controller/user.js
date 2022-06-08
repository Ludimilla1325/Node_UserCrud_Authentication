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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getMe = exports.getUsers = exports.createUser = void 0;
const bcrypt = __importStar(require("bcrypt"));
const sequelize_1 = require("sequelize");
const user_1 = require("../services/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt);
    try {
        const newUser = yield (0, user_1.createUser)(name, email, hash);
        delete newUser["password"];
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err instanceof sequelize_1.UniqueConstraintError) {
            return res.status(409).json({
                message: "This email already exist!",
            });
        }
        return res.status(500).json(err);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userList = [];
    (0, user_1.getUsers)()
        .then((data) => {
        userList = data;
        res.json(userList);
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
});
exports.getUsers = getUsers;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const gotMe = yield (0, user_1.getUser)(userId).catch((err) => {
        res.status(500).json(err);
    });
    if (!gotMe) {
        return res.status(404).json({ message: "Search fail. Try again!" });
    }
    return res.json(gotMe);
});
exports.getMe = getMe;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    try {
        const foundUser = yield (0, user_1.getUser)(userId).catch((err) => {
            res.status(500).json(err);
        });
        if (!foundUser) {
            return res.status(404).json({ message: "Search fail. Try again!" });
        }
        return res.json(foundUser);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const deletedUser = yield (0, user_1.deleteUser)(userId).catch((err) => {
        res.status(500).json(err);
    });
    if (!deletedUser) {
        return res.status(404).json({ message: "Delete fail. Try again!" });
    }
    return res.status(204);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map