import express from 'express';
import { RouteHandler } from './RouteHandler';
import { Request } from '../app/Request';
import { Response } from '../app/Response';
import { RouteMiddleware } from './RouteMiddleware';
import { getLocalsReq, getLocalsRes } from '../app/bindApp';

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
      return middleware(getLocalsReq(res), getLocalsRes(res), next);
    });
    return this;
  }

  /**
   * Registers a new handler at given mount point
   */
  get(endpoint: string, handler: RouteHandler) {
    this.expressRouter.get(endpoint, (req, res) => {
      return handler(getLocalsReq(res), getLocalsRes(res));
    });
    return this;
  }
}
