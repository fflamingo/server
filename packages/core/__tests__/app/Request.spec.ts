import { Request } from '../../src/app/Request';

test('should create a request from original one', () => {
  const req: any = {};
  expect(new Request(req)).toHaveProperty('expressReq', req);
});
