import { prisma } from "../src/app/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prisma.user.deleteMany();
};

export const createTestUser = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};
