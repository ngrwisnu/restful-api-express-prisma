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

export const getTestUser = async () => {
  return prisma.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeTestContact = async () => {
  await prisma.contact.deleteMany();
};

export const createTestContact = async () => {
  await prisma.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@email.com",
      phone: "12090000",
    },
  });
};

export const getTestContact = async () => {
  return prisma.contact.findFirst({
    where: {
      username: "test",
    },
  });
};