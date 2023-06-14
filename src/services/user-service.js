import { registerUserValidation } from "../validation/user-validation.js";
import { ErrorResponse } from "../error/error-response.js";
import bcrypt from "bcrypt";
import { prisma } from "../app/database.js";
import validate from "../validation/validation.js";

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

export default { register };
