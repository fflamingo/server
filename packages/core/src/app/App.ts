import express from 'express';
import { augmentRouterMiddleware } from './augmentRouterMiddleware';

export class App {
  expressApplication: express.Application;

  constructor() {
    this.expressApplication = express();

    this.expressApplication.use(augmentRouterMiddleware);
  }
}
