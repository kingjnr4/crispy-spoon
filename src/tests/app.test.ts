import { expect, test } from "vitest";
import request from "supertest";
import { server } from "..";
const requestWithSupertest = request(server);
test("regster works", async () => {
  const res = await requestWithSupertest.post("/api/v1/auth/register").send({
    email: "onyiboixy@gmail.com",
    password: "kingjnr4",
    lastname: "abaeze",
    firstname: "noble",
    phone: "+2349040301069",
  });
  console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("id");
});
