import express from 'express';
import { Request } from '../request/Request';
import { Response } from '../response/Response';

export function augmentRouterMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.locals.__flamingo = {
    req: new Request(req),
    res: new Response(res)
  };
  next();
}
