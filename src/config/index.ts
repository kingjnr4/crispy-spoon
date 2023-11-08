import { config } from "dotenv";
config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  SECRET_KEY,
} = process.env;
