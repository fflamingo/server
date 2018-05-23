import express from 'express';

export class Request {
  /**
   * Original express request
   */
  expressReq: express.Request;

  constructor(expressReq: express.Request) {
    this.expressReq = expressReq;
  }
}
