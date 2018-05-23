import express from 'express';
import { Request } from '../request/Request';
import { Response } from '../response/Response';

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => void | Promise<void>;
