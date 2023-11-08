import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import AuthContoller from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { registerSchema } from "../dto/register.dto";
import { loginSchema } from "../dto/login.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import TransactionController from "../controllers/transaction.controller";
import { transferSchema } from "../dto/transfer.dto";
import { depositSchema } from "../dto/deposit.dto";
import { withdrawSchema } from "../dto/withdraw.dto";

export class TransactionRoute implements Route {
  path = "/transaction";
  router = Router();
  public controller = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/deposit`,
      authMiddleware,
      validationMiddleware(depositSchema),
      this.controller.deposit
    );
    this.router.post(
      `${this.path}/withdraw`,
      authMiddleware,
      validationMiddleware(withdrawSchema),
      this.controller.withdraw
    );
    this.router.post(
      `${this.path}/transfer`,
      authMiddleware,
      validationMiddleware(transferSchema),
      this.controller.transfer
    );
    this.router.get(
      `${this.path}/transactions`,
      authMiddleware,
      this.controller.list
    );
  }
}
