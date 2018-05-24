import express from 'express';
import { Request } from '../app/Request';
import { Response } from '../app/Response';

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => void | Promise<void>;
