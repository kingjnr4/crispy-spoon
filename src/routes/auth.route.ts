import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import AuthContoller from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { registerSchema } from "../dto/register.dto";
import { loginSchema } from "../dto/login.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

export class AuthRoute implements Route {
  path = "/auth";
  router = Router();
  public controller = new AuthContoller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(registerSchema),
      this.controller.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(loginSchema),
      this.controller.login
    );
    this.router.post(
      `${this.path}/profile`,
      authMiddleware,
      this.controller.profile
    );
  }
}
