import express from "express";
import apiRouter from "../routes/api.js";
import { errorMiddleware } from "../middleware/error.js";

export const app = express();

app.use(express.json());

app.use(apiRouter.router);
app.use(errorMiddleware);
