import { Response } from '../../src/app/Response';

test('should create a response from original one', () => {
  const res: any = {};
  expect(new Response(res)).toHaveProperty('expressRes', res);
});
