import express from "express";
import userController from "../controllers/user-controller.js";

const router = new express.Router();

router.post("/api/users", userController.register);

export default { router };
