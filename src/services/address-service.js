import validate from "../validation/validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { prisma } from "../app/database.js";
import { ErrorResponse } from "../error/error-response.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";

const checkIsContactExist = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prisma.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  if (totalContactInDatabase !== 1)
    throw new ErrorResponse(404, "Contact is not found!");

  return contactId;
};

const createAddress = async (user, contactId, request) => {
  contactId = await checkIsContactExist(user, contactId);

  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prisma.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const getAddress = async (user, contactId, addressId) => {
  contactId = await checkIsContactExist(user, contactId);

  addressId = validate(getAddressValidation, addressId);

  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) throw new ErrorResponse(404, "Address is not found!");

  return address;
};

const updateAddress = async (user, contactId, request) => {
  contactId = await checkIsContactExist(user, contactId);

  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prisma.address.count({
    where: {
      id: address.id,
      contact_id: contactId,
    },
  });

  if (totalAddressInDatabase !== 1)
    throw new ErrorResponse(404, "Address is not found");

  return prisma.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: request.street,
      city: request.city,
      province: request.province,
      country: request.country,
      postal_code: request.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default {
  createAddress,
  getAddress,
  updateAddress,
};
