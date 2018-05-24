import { makeSchema } from '../src/index';

describe('makeSchema', () => {
  test('should return schema', () => {
    // @todo
    expect(makeSchema('hello')).toEqual('hello');
  });
});
