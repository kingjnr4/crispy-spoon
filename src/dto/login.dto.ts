import z, { TypeOf } from "zod";
import { DB } from "../database";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("must be email")
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
  }),
});

export type loginDto = z.infer<typeof loginSchema>;
