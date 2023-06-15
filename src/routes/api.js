import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/auth.js";
import contactController from "../controllers/contact-controller.js";

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

export default { router };
