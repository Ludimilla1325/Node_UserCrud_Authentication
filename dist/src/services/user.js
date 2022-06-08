"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUser = exports.getUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(name, email, password) {
    return prisma.user.create({
        data: {
            name,
            password,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}
exports.createUser = createUser;
function getUsers() {
    return prisma.user.findMany();
}
exports.getUsers = getUsers;
function getUser(userId) {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}
exports.getUser = getUser;
function getUserByEmail(email) {
    return prisma.user.findFirst({
        where: {
            email,
        },
    });
}
exports.getUserByEmail = getUserByEmail;
function updateUser(userId, name) {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: { name },
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return prisma.user.delete({
        where: {
            id: userId,
        },
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map