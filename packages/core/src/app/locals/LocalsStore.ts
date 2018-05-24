import express from 'express';

export class LocalsStore {
  static set(res: express.Response, key: string, value: any) {
    if (!res.locals.__flamingo) {
      res.locals.__flamingo = {};
    }

    res.locals.__flamingo[key] = value;
  }

  static get(res: express.Response, key: string) {
    if (!res.locals.__flamingo) {
      return undefined;
    }

    return res.locals.__flamingo[key];
  }
}
