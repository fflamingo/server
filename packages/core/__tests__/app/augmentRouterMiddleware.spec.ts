jest.mock('../../src/request/Request', () => ({
  Request: jest.fn().mockImplementation(() => ({}))
}));
jest.mock('../../src/response/Response', () => ({
  Response: jest.fn().mockImplementation(() => ({}))
}));

import { Request } from '../../src/request/Request';
import { Response } from '../../src/response/Response';
import {
  augmentRouterMiddleware,
  FFLAMINGO_LOCALS_KEY
} from '../../src/app/augmentRouterMiddleware';

test('should enhance locals with constructed request and response', () => {
  const res = { locals: {} as any };
  const next = jest.fn();
  augmentRouterMiddleware({} as any, res as any, next);
  expect(res.locals[FFLAMINGO_LOCALS_KEY]).toHaveProperty('req');
  expect(res.locals[FFLAMINGO_LOCALS_KEY]).toHaveProperty('res');
  expect(Request).toHaveBeenCalled();
  expect(Response).toHaveBeenCalled();
});
