import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { ErrorResponse } from "../error/error-response.js";
import bcrypt from "bcrypt";
import { prisma } from "../app/database.js";
import validate from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) throw new ErrorResponse(400, "Username already exist!");

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) throw new ErrorResponse(401, "Username or Password is wrong!");

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid)
    throw new ErrorResponse(401, "Username or Password is wrong");

  const token = uuid().toString();

  return prisma.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
