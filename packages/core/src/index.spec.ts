import { route } from '.';

describe('index', () => {
  test('route', () => {
    expect(route('sample/')).toEqual('sample/');
  });
});
