import z, { TypeOf } from "zod";
import { DB } from "../database";
import validator from "validator";

export const withdrawSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: "amount is required" }).min(1),
  }),
});

export type withdrawDto = z.infer<typeof withdrawSchema>;
