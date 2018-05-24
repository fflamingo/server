import { route } from '../src/index';

describe('index', () => {
  test('route', () => {
    expect(route('sample/')).toEqual('sample/');
  });
});
