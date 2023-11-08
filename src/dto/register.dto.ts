import z, { TypeOf } from "zod";
import { DB } from "../database";
import validator from "validator";

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("email must be an email")
      .min(1)
      .trim()
      .refine(async (email) => {
        const user = await DB.getInstance().user.findFirst({
          where: {
            email,
          },
        });
        return Boolean(!user);
      }, "User already exists"),
    password: z.string({ required_error: "password is required" }).min(6),
    firstname: z.string({ required_error: "firstname is required" }).min(4),
    lastname: z.string({ required_error: "lastname is required" }).min(4),
    phone: z
      .string({ required_error: "phone is required" })
      .refine((arg) => validator.isMobilePhone(arg, "en-NG")),
  }),
});

export type registerDto = z.infer<typeof registerSchema>;
