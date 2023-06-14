import { ErrorResponse } from "../error/error-response.js";

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ErrorResponse) {
    res
      .status(err.status)
      .json({
        error: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        error: err.message,
      })
      .end();
  }
};
