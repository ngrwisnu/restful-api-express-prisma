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

export const createManyTestContact = async () => {
  for (let i = 0; i < 12; i++) {
    await prisma.contact.create({
      data: {
        username: `test`,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@email.com`,
        phone: `1209000${i}`,
      },
    });
  }
};

export const getTestContact = async () => {
  return prisma.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export const removeTestAddress = async () => {
  await prisma.address.deleteMany();
};

export const createTestAddress = async () => {
  const contact = await getTestContact();

  await prisma.address.create({
    data: {
      street: "Anggrek St.",
      city: "Jambi",
      province: "Jambi",
      country: "Indonesia",
      postal_code: "12111",
      contact_id: contact.id,
    },
  });
};

export const getTestAddress = async () => {
  return prisma.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};
