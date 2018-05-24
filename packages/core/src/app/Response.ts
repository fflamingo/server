import express from 'express';

export class Response {
  /**
   * Original express response
   */
  expressRes: express.Response;

  constructor(expressRes: express.Response) {
    this.expressRes = expressRes;
  }
}
