import express from 'express';
import { Request } from '../app/Request';
import { Response } from '../app/Response';

export const FFLAMINGO_LOCALS_KEY = '$$fflamingo$$';

/**
 * Use express.js `res.locals` to store fflamingo augmented request
 * and response.
 *
 * They will be available in the Router and all handlers.
 */
export function bindAppMiddleware(
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

export function getLocalsReq(res: express.Response): Request {
  return res.locals[FFLAMINGO_LOCALS_KEY].req;
}

export function getLocalsRes(res: express.Response): Response {
  return res.locals[FFLAMINGO_LOCALS_KEY].res;
}
