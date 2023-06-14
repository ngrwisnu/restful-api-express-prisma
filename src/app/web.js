import express from "express";
import userRouter from "../routes/user.js";
import { errorMiddleware } from "../middleware/error.js";

export const app = express();

app.use(express.json());

app.use(userRouter.router);
app.use(errorMiddleware);
