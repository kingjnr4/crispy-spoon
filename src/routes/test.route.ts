import { Router } from "express";
import TestController from "../controllers/test.controller";
import { Route } from "../interfaces/route.interface";

class TestRoute implements Route {
  public path: string = "/test";
  public router: Router = Router();
  public controller: TestController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.controller.getHello);
  }
}

export default TestRoute;
