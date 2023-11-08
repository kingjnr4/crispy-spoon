import { DB } from "../database";
import { loginDto } from "../dto/login.dto";
import { registerDto } from "../dto/register.dto";
import HttpException, {
  NotFoundException,
  UnAuthorizedException,
} from "../utils/exception";
import { StatusCodes, UNAUTHORIZED } from "http-status-codes";
import { comparePassword, hashPassword, signJwt } from "../utils/helpers";

export default class AuthService {
  public async register(dto: registerDto) {
    const passhash = await hashPassword(dto.body.password);
    const user = await DB.getInstance().user.create({
      data: {
        email: dto.body.email,
        firstname: dto.body.firstname,
        lastname: dto.body.lastname,
        phone: dto.body.phone,
        password: passhash,
        account_number: genAccountNumber(dto.body.phone),
        balance: 0,
      },
    });
    const { password, ...rest } = user;
    const jwt = signJwt(rest);
    return { jwt, rest };
  }
  public async login(dto: loginDto) {
    const user = await DB.getInstance().user.findFirst({
      where: {
        email: dto.body.email,
      },
    });
    if (!user) throw new UnAuthorizedException("Invalid Credentials");
    const passwordMatch = comparePassword(dto.body.password, user.password);
    if (!passwordMatch) throw new UnAuthorizedException("Invalid Credentials");
  }
  public async profile(id: number) {
    const user = await DB.getInstance().user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException("User does not exist");
    const { password, ...rest } = user;
    return rest;
  }
}
function genAccountNumber(phone: string) {
  return phone.replace("+234", "");
}
