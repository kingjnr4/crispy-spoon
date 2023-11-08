import { NextFunction, Request, Response } from "express";
import TestService from "../services/test.service";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";

export default class AuthContoller {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  private authservice: AuthService = new AuthService();
  async register(request: Request, response: Response, next: NextFunction) {
    const data = await this.authService.register(request.body);
    response.status(StatusCodes.OK).send(data);
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const data = await this.authService.login(request.body);
    response.status(StatusCodes.OK).send(data);
  }
  async profile(request: Request, response: Response, next: NextFunction) {
    response.status(StatusCodes.OK).send(request.authUser);
  }
}
