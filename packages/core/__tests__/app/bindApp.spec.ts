jest.mock('../../src/app/Request', () => ({
  Request: jest.fn().mockImplementation(() => ({}))
}));
jest.mock('../../src/app/Response', () => ({
  Response: jest.fn().mockImplementation(() => ({}))
}));

import { Request } from '../../src/app/Request';
import { Response } from '../../src/app/Response';
import {
  bindAppMiddleware,
  FFLAMINGO_LOCALS_KEY,
  getLocalsReq,
  getLocalsRes
} from '../../src/app/bindApp';

test('should enhance locals with constructed request and response', () => {
  const res = { locals: {} as any };
  const next = jest.fn();
  bindAppMiddleware({} as any, res as any, next);
  expect(res.locals[FFLAMINGO_LOCALS_KEY]).toHaveProperty('req');
  expect(res.locals[FFLAMINGO_LOCALS_KEY]).toHaveProperty('res');
  expect(Request).toHaveBeenCalled();
  expect(Response).toHaveBeenCalled();
});

describe('getLocals', () => {
  test('should retrieve request and response bounded local', () => {
    const res: any = {
      locals: { [FFLAMINGO_LOCALS_KEY]: { req: jest.fn(), res: jest.fn() } }
    };

    expect(getLocalsReq(res)).not.toBeNull();
    expect(getLocalsRes(res)).not.toBeNull();
  });

  test('should throw when app is not bound', () => {
    expect(() => getLocalsReq({ locals: {} } as any)).toThrow();
  });
});
