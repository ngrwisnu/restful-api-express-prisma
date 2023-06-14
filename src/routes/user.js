import express from "express";
import userController from "../controllers/user-controller.js";

const router = new express.Router();

router.post("/api/users", userController.register);
router.post("/api/users/login", userController.login);

export default { router };
