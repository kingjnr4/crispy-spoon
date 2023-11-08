import App from "./app";
import { DB } from "./database";
import { AuthRoute } from "./routes/auth.route";
import TestRoute from "./routes/test.route";
import { TransactionRoute } from "./routes/transaction.route";
import { logger } from "./utils/logger";

const db = DB.getInstance();
(async () => {
  await db.$connect();
  logger.info("🛢 [database] :Database connection successfull");
})();
const app = new App([new TestRoute(), new AuthRoute(), new TransactionRoute()]);
app.listen();
export const server = app.app;
