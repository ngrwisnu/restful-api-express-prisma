import contactService from "../services/contact-service.js";

const createContact = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await contactService.createContact(user, request);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await contactService.getContact(user, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;

    const result = await contactService.updateContact(user, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await contactService.removeContact(user, contactId);

    res.status(200).json({
      data: "Ok",
    });
  } catch (error) {
    next(error);
  }
};

export default { createContact, getContact, updateContact, removeContact };
