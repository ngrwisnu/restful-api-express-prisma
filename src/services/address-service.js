import validate from "../validation/validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { prisma } from "../app/database.js";
import { ErrorResponse } from "../error/error-response.js";
import { createAddressValidation } from "../validation/address-validation.js";

const createAddress = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prisma.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  if (totalContactInDatabase !== 1)
    throw new ErrorResponse(404, "Contact is not found!");

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

export default {
  createAddress,
};
