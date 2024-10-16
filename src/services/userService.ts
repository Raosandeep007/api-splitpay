import prisma from "../prisma/client";

export const UserService = {
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  createUser: async (data: { name: string; email: string }) => {
    return await prisma.user.create({
      data,
    });
  },
};
