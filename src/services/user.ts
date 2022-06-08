import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createUser(name: string, email: string, password: string) {
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

export function getUsers() {
  return prisma.user.findMany();
}

export function getUser(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export function updateUser(userId: number, name: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: { name },
  });
}

export function deleteUser(userId: number) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
