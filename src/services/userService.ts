import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";

export const UserService = {
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  createUser: async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({
      data,
    });
  },

  findUnique: async ({ email }: Pick<Prisma.UserCreateInput, "email">) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};
