import { DB } from "../database";
import { loginDto } from "../dto/login.dto";
import { registerDto } from "../dto/register.dto";
import HttpException, {
  BadRequestException,
  NotFoundException,
  UnAuthorizedException,
} from "../utils/exception";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword, signJwt } from "../utils/helpers";
import { depositDto } from "../dto/deposit.dto";
import { withdrawDto } from "../dto/withdraw.dto";
import { transferDto } from "../dto/transfer.dto";

export default class TransactionService {
  private static readonly db = DB.getInstance();
  public static async deposit(dto: depositDto, user_id: number) {
    const { password, ...user } = await this.db.user.update({
      where: {
        id: user_id,
      },
      data: {
        balance: {
          increment: dto.body.amount,
        },
      },
    });
    if (!user) {
    }
    const txn = await this.db.transaction.create({
      data: {
        amount: dto.body.amount,
        type: "credit",
        user_id,
        desc: `User deposited ${dto.body.amount} into account`,
      },
    });
    return txn;
  }
  public static async withdraw(dto: withdrawDto, user_id: number) {
    try {
      await this.db.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: {
            id: user_id,
          },
          data: {
            balance: {
              decrement: dto.body.amount,
            },
          },
        });
        if (user.balance.isNegative()) throw new Error("insufficient balance");
      });
      return await this.db.transaction.create({
        data: {
          amount: dto.body.amount,
          type: "debit",
          user_id,
          desc: `User withdrew ${dto.body.amount} `,
        },
      });
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }
  public static async transfer(dto: transferDto, user_id: number) {
    try {
      await this.db.$transaction(async (tx) => {
        const reciever = await tx.user.findFirst({
          where: { account_number: dto.body.account_number },
        });
        if (!reciever)
          throw new Error("reciever account number does not exist");
        const sender = await tx.user.update({
          where: {
            id: user_id,
          },
          data: {
            balance: {
              decrement: dto.body.amount,
            },
          },
        });
        if (sender.balance.isNegative())
          throw new Error("insufficient balance");

        const recieve = await tx.user.update({
          where: {
            id: reciever.id,
          },
          data: {
            balance: {
              increment: dto.body.amount,
            },
          },
        });
        if (!recieve) throw new Error("error occured");
      });
      return await this.db.transaction.create({
        data: {
          amount: dto.body.amount,
          type: "debit",
          user_id,
          desc: `User transferred ${dto.body.amount} to ${dto.body.account_number}`,
        },
      });
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  public static async listTransactions(user_id: number) {
    return await this.db.transaction.findMany({
      where: {
        user_id,
      },
    });
  }
}
