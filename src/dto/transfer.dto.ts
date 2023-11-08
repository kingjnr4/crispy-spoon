import z, { TypeOf } from "zod";
import { DB } from "../database";
import validator from "validator";

export const transferSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: "amount is required" }).min(1),
    account_number: z
      .string({ required_error: "account number is required" })
      .length(10, "invalid account number"),
  }),
});

export type transferDto = z.infer<typeof transferSchema>;
