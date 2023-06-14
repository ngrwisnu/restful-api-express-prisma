import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = new express.Router();

router.post("/api/users", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users/current", authMiddleware, userController.getUser);

export default { router };
