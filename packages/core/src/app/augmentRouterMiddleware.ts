import express from 'express';
import { Request } from '../request/Request';
import { Response } from '../response/Response';
import { LocalsStore } from './locals/LocalsStore';

export function augmentRouterMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  LocalsStore.set(res, 'req', new Request(req));
  LocalsStore.set(res, 'res', new Response(res));
  next();
}
