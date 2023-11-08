import { expect, test } from "vitest";
import request from "supertest";
import { server } from "..";
const requestWithSupertest = request(server);
test("regster works", async () => {
  const res = await requestWithSupertest.post("/api/v1/register");
  expect(res.status);
});
