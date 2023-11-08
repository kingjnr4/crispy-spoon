import { StatusCodes } from "http-status-codes";

export default class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class UnAuthorizedException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
