import express from 'express';
import { bindAppMiddleware } from './bindApp';

export class App {
  expressApplication: express.Application;

  constructor() {
    this.expressApplication = express();

    this.expressApplication.use(bindAppMiddleware);
  }
}
