import supertest from "supertest";
import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  removeTestContact,
  removeTestUser,
} from "./utils.js";
import { app } from "../src/app/web.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("should create a new contact", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@email.com",
        phone: "12090000",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@email.com");
    expect(result.body.data.phone).toBe("12090000");
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("should get user's contacts", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .get("/api/contacts/" + contact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.first_name).toBe(contact.first_name);
    expect(result.body.data.last_name).toBe(contact.last_name);
    expect(result.body.data.email).toBe(contact.email);
    expect(result.body.data.phone).toBe(contact.phone);
  });

  it("should return 404 when contactId is invalid", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .get("/api/contacts/" + (contact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("should update user's contact's phone", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        phone: "80810000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.first_name).toBe(contact.first_name);
    expect(result.body.data.last_name).toBe(contact.last_name);
    expect(result.body.data.email).toBe(contact.email);
    expect(result.body.data.phone).toBe("80810000");
  });

  it("should update user's contact", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        first_name: "ema",
        last_name: "doe",
        email: "ema@email.com",
        phone: "80450000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.first_name).toBe("ema");
    expect(result.body.data.last_name).toBe("doe");
    expect(result.body.data.email).toBe("ema@email.com");
    expect(result.body.data.phone).toBe("80450000");
  });

  it("should return 404 when contactId is not found", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + (contact.id + 1))
      .set("Authorization", "test")
      .send({
        first_name: "ema",
        last_name: "doe",
        email: "ema@email.com",
        phone: "80450000",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });

  it("should reject if request body is invalid", async () => {
    const contact = await getTestContact();

    const result = await supertest(app)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "ema",
        phone: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("DELETE /api/contact/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("should delete the selected contact", async () => {
    let contact = await getTestContact();

    const result = await supertest(app)
      .delete("/api/contacts/" + contact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");

    contact = await getTestContact();

    expect(contact).toBeNull();
  });

  it("should reject when contact is not found", async () => {
    let contact = await getTestContact();

    const result = await supertest(app)
      .delete("/api/contacts/" + (contact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("should be able to search without params", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.result.length).toBe(10);
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_page).toBe(2);
    expect(result.body.data.paging.total_items).toBe(12);
  });

  it("should be able to search to page 2", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.result.length).toBe(2);
    expect(result.body.data.paging.page).toBe(2);
    expect(result.body.data.paging.total_page).toBe(2);
    expect(result.body.data.paging.total_items).toBe(12);
  });

  it("should be able to search specific contact with phone", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({
        name: "test",
        phone: "12090005",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.result.length).toBe(1);
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_page).toBe(1);
    expect(result.body.data.paging.total_items).toBe(1);
  });

  it("should be able to search couple of contacts based on name", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.result.length).toBe(3);
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_page).toBe(1);
    expect(result.body.data.paging.total_items).toBe(3);
  });

  it("should be able to return no contact when the search value doesn't match with the data", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({
        name: "test 18",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.result.length).toBe(0);
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_page).toBe(1);
    expect(result.body.data.paging.total_items).toBe(0);
  });
});
