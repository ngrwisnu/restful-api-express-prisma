import { prisma } from "../app/database.js";
import { ErrorResponse } from "../error/error-response.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import validate from "../validation/validation.js";

const isContactExistInDatabase = async (user, contactId) => {
  const totalContactInDatabase = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1)
    throw new ErrorResponse(404, "Contact is not found!");

  return totalContactInDatabase;
};

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

  await isContactExistInDatabase(user, contact.id);

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

const removeContact = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  await isContactExistInDatabase(user, contactId);

  return prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const searchContact = async (user, request) => {
  request = validate(searchContactValidation, request);

  let filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }

  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const skip = (request.page - 1) * request.size;

  const contacts = await prisma.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prisma.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_items: totalItems,
      total_page: totalItems === 0 ? 1 : Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  createContact,
  getContact,
  updateContact,
  removeContact,
  searchContact,
};
