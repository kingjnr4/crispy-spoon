import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";
import TransactionService from "../services/transaction.service";

export default class TransactionController {
  public async transfer(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const data = await TransactionService.transfer(
      request.body,
      <number>request.authUser?.id
    );
    response.status(StatusCodes.OK).send(data);
  }
  public async deposit(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const data = await TransactionService.deposit(
      request.body,
      <number>request.authUser?.id
    );
    response.status(StatusCodes.OK).send(data);
  }
  public async withdraw(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const data = await TransactionService.withdraw(
      request,
      <number>request.authUser?.id
    );
    response.status(StatusCodes.OK).send(data);
  }
  public async list(request: Request, response: Response, next: NextFunction) {
    const data = await TransactionService.listTransactions(
      <number>request.authUser?.id
    );
    response.status(StatusCodes.OK).send(data);
  }
}
