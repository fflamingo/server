jest.mock('../../src/request/Request', () => ({
  Request: jest.fn().mockImplementation(() => ({}))
}));
jest.mock('../../src/response/Response', () => ({
  Response: jest.fn().mockImplementation(() => ({}))
}));

import { Request } from '../../src/request/Request';
import { Response } from '../../src/response/Response';
import { augmentRouterMiddleware } from '../../src/app/augmentRouterMiddleware';

test('should enhance locals with constructed request and response', () => {
  const res = { locals: {} as any };
  const next = jest.fn();
  augmentRouterMiddleware({} as any, res as any, next);
  expect(res.locals.__flamingo).toHaveProperty('req');
  expect(res.locals.__flamingo).toHaveProperty('res');
  expect(Request).toHaveBeenCalled();
  expect(Response).toHaveBeenCalled();
});
