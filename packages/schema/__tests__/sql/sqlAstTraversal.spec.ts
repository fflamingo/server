import { getFromAliasName, sqlAstBuilder } from '../../src';

describe('getFromAliasName', () => {
  test('should retrieve name from table', () => {
    const ast = sqlAstBuilder.astTable('tableName');
    expect(getFromAliasName(ast)).toEqual('tableName');
  });

  test('should retrieve name from wrapped nested query', () => {
    const ast = sqlAstBuilder.astWrappedQuery({} as any, 'nested');
    expect(getFromAliasName(ast)).toEqual('nested');
  });
});
