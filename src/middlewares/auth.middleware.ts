import { RequestHandler } from "express";
import AuthService from "../services/auth.service";
import { verifyJwt } from "../utils/helpers";
export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send("Access Denied. No Token Provided.");
  }
  const payload = verifyJwt(token);
  if (!payload) {
    return res.status(400).json({ message: "Invalid Token." });
  }
  const user = await AuthService.profile(payload.id);
  req.authUser = user;
  next();
};
