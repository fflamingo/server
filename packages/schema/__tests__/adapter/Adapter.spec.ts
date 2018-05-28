import { Adapter } from '../../src/adapter/Adapter';

test('should not allow an empty adapter', async () => {
  const adapter = new Adapter();
  expect(adapter.fromAST({} as any)).rejects.toBeInstanceOf(Error);
});
