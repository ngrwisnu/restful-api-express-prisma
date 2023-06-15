import addressService from "../services/address-service.js";

const createAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;

    const result = await addressService.createAddress(user, contactId, request);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createAddress,
};
