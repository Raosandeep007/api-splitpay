import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";

export const UserService = {
  getAll: async () => {
    return await prisma.user.findMany();
  },

  create: async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({
      data,
    });
  },

  find: async ({ email }: Pick<Prisma.UserCreateInput, "email">) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};
