import supertest from "supertest";
import { app } from "../src/app/web.js";
import { prisma } from "../src/app/database.js";
import { logger } from "../src/app/logging.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should be able register new user", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "jason",
      password: "rahasia",
      name: "Jason Doe",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("jason");
    expect(result.body.data.name).toBe("Jason Doe");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should pass an error if the body is invalid", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should reject the request if the user already exist", async () => {
    let result = await supertest(app).post("/api/users").send({
      username: "jason",
      password: "rahasia",
      name: "Jason Doe",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("jason");
    expect(result.body.data.name).toBe("Jason Doe");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(app).post("/api/users").send({
      username: "jason",
      password: "rahasia",
      name: "Jason Doe",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
