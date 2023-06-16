import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeTestAddress,
  removeTestContact,
  removeTestUser,
} from "./utils.js";
import { app } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe("POST /api/contacts/:contactId/addresses, create address", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it("should create a new address", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Anggrek St.",
        city: "Jambi",
        province: "Jambi",
        country: "Indonesia",
        postal_code: "12111",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Anggrek St.");
    expect(result.body.data.city).toBe("Jambi");
    expect(result.body.data.province).toBe("Jambi");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("12111");
  });

  it("should error if request is invalid", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Anggrek St.",
        city: "Jambi",
        province: "Jambi",
        country: "",
        postal_code: "12111",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error if contact is not found", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Anggrek St.",
        city: "Jambi",
        province: "Jambi",
        country: "Indonesia",
        postal_code: "12111",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId, get address", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it("should be able to get the address", async () => {
    const contact = await getTestContact();
    const address = await getTestAddress();

    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Anggrek St.");
    expect(result.body.data.city).toBe("Jambi");
    expect(result.body.data.province).toBe("Jambi");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("12111");
  });

  it("should reject the request if contact id isn't found", async () => {
    const contact = await getTestContact();
    const address = await getTestAddress();

    const result = await supertest(app)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });

  it("should reject the request if the address id isn't found", async () => {
    const contact = await getTestContact();
    const address = await getTestAddress();

    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});
