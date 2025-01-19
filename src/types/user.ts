import { User } from "@prisma/client";

export type UserResponse = User & {
  access: string;
  refresh: string;
};
