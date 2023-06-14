import supertest from "supertest";
import { app } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { createTestUser, removeTestUser } from "./utils.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await removeTestUser();
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

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should success when user login", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should fail when the body request is invalid", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should fail when the username is invalid", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "test2",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it("should fail when the password is invalid", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should get current user data", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
  });

  it("should fail if token is invalid", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "test2");

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});
