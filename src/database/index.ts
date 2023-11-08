import { PrismaClient } from "@prisma/client";

export class DB extends PrismaClient {
  private static _instance: DB;

  static getInstance() {
    if (!this._instance) {
      this._instance = new DB();
    }
    return this._instance;
  }
}
