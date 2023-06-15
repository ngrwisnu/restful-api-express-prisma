import { prisma } from "../app/database.js";
import { ErrorResponse } from "../error/error-response.js";
import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import validate from "../validation/validation.js";

const createContact = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prisma.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const getContact = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  console.log("user: ", user.username);
  console.log("id: ", contactId);

  const contact = await prisma.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) throw new ErrorResponse(404, "Contact is not found");

  return contact;
};

const updateContact = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prisma.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1)
    throw new ErrorResponse(404, "Contact is not found!");

  return prisma.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

export default { createContact, getContact, updateContact };
