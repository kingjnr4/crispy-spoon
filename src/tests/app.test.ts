import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import { server } from "..";
import { log } from "console";
const requestWithSupertest = request(server);

describe("auth", () => {
  test("regster works", async () => {
    const res = await requestWithSupertest.post("/api/v1/auth/register").send({
      email: "onyiboixy@gmail.com",
      password: "kingjnr4",
      lastname: "abaeze",
      firstname: "noble",
      phone: "+2349040301069",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });
  test("login works", async () => {
    const res = await requestWithSupertest.post("/api/v1/auth/login").send({
      email: "onyiboixy@gmail.com",
      password: "kingjnr4",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });
});
describe("transactions", () => {
  test("deposit works", async () => {
    const userRes = await requestWithSupertest.post("/api/v1/auth/login").send({
      email: "onyiboixy@gmail.com",
      password: "kingjnr4",
    });
    const res = await requestWithSupertest
      .post("/api/v1/transaction/deposit")
      .set("Authorization", "Bearer " + userRes.body.jwt)
      .send({
        amount: 10000,
      });
    console.log(res.body);

    expect(res.body).toHaveProperty("id");
    expect(res.body.amount).toBe("10000");
    expect(res.body.type).toBe("credit");
  });

  test("deposit works", async () => {
    const userRes = await requestWithSupertest.post("/api/v1/auth/login").send({
      email: "onyiboixy@gmail.com",
      password: "kingjnr4",
    });
    const res = await requestWithSupertest
      .post("/api/v1/transaction/withdraw")
      .set("Authorization", "Bearer " + userRes.body.jwt)
      .send({
        amount: 10000,
      });
    console.log(res.body);

    expect(res.body).toHaveProperty("id");
    expect(res.body.amount).toBe("10000");
    expect(res.body.type).toBe("debit");
  });

  test("withdraw should fail", async () => {
    const userRes = await requestWithSupertest.post("/api/v1/auth/login").send({
      email: "onyiboixy@gmail.com",
      password: "kingjnr4",
    });
    const res = await requestWithSupertest
      .post("/api/v1/transaction/withdraw")
      .set("Authorization", "Bearer " + userRes.body.jwt)
      .send({
        amount: 10000,
      });
    expect(res.status).toBe(400);
  });
});
