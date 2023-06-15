import { prisma } from "../app/database.js";
import { ErrorResponse } from "../error/error-response.js";
import {
  createContactValidation,
  getContactValidation,
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

export default { createContact, getContact };
