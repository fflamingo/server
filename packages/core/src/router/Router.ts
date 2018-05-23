import express from 'express';
import { HttpVerb } from './HttpVerb';
import { RouteHandler } from './RouteHandler';
import { Request } from '../request/Request';
import { Response } from '../response/Response';
import { RouteMiddleware } from './RouteMiddleware';

export interface RouterOptions extends express.RouterOptions {}

export class Router {
  expressRouter: express.Router;

  constructor(options: RouterOptions = {}) {
    this.expressRouter = express.Router(options);
  }

  static create(options: RouterOptions = {}) {
    return new this(options);
  }

  /**
   * Mounts middleware
   */
  use(middleware: RouteMiddleware) {
    this.expressRouter.use((req, res, next) => {
      return middleware(
        res.locals.__fflamingo.req,
        res.locals.__fflamingo.res,
        next
      );
    });
    return this;
  }

  /**
   * Registers a new handler at given mount point
   */
  get(endpoint: string, handler: RouteHandler) {
    this.expressRouter.get(endpoint, (req, res) => {
      return handler(res.locals.__fflamingo.req, res.locals.__fflamingo.res);
    });
    return this;
  }
}
