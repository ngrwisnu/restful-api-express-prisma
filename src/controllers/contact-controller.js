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

export default { createContact };
