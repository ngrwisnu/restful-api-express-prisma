import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/auth.js";
import contactController from "../controllers/contact-controller.js";
import addressController from "../controllers/address-controller.js";

const router = new express.Router();

// User API
router.post("/api/users", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users/current", authMiddleware, userController.getUser);
router.patch("/api/users/current", authMiddleware, userController.updateUser);
router.delete("/api/users/logout", authMiddleware, userController.logoutUser);

// Contact API
router.post("/api/contacts", authMiddleware, contactController.createContact);
router.get(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.getContact
);
router.put(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.updateContact
);
router.delete(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.removeContact
);
router.get("/api/contacts", authMiddleware, contactController.searchContact);

// Address API
router.post(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.createAddress
);
router.get(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.getAddress
);
router.put(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.updateAddress
);
router.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.removeAddress
);
router.get(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.listAddress
);

export default { router };
