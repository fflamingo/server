import express from 'express';
import { Request } from '../request/Request';
import { Response } from '../response/Response';

export const FFLAMINGO_LOCALS_KEY = '$$fflamingo$$';

/**
 * Use express.js `res.locals` to store fflamingo augmented request
 * and response.
 *
 * They will be available in the Router and all handlers.
 */
export function augmentRouterMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.locals[FFLAMINGO_LOCALS_KEY] = {
    req: new Request(req),
    res: new Response(res)
  };

  next();
}
