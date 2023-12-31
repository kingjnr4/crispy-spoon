import { RequestHandler } from "express";

import { AnyZodObject } from "zod";
import HttpException, { BadRequestException } from "../utils/exception";
import { logger } from "../utils/logger";

export const validationMiddleware = (schema: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    const parseResult = await schema.spa({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!parseResult.success) {
      logger.error(parseResult.error.flatten());
      next(new BadRequestException(parseResult.error.issues as any));
      return;
    }
    next();
  };
};
