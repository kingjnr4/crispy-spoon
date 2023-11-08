import { NextFunction, Request, Response } from "express";
import TestService from "../services/test.service";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";
import { logger } from "../utils/logger";

export default class AuthContoller {
  constructor() {}
  async register(request: Request, response: Response, next: NextFunction) {
    const data = await AuthService.register(request);
    response.status(StatusCodes.OK).send(data);
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const data = await AuthService.login(request);
    response.status(StatusCodes.OK).send(data);
  }
  async profile(request: Request, response: Response, next: NextFunction) {
    response.status(StatusCodes.OK).send(request.authUser);
  }
}
