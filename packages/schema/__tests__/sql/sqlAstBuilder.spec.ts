import { sqlAstBuilder } from '../../src';

test('should not allow identifier with "." separator', () => {
  expect(() => sqlAstBuilder.astIdentifier('column.table')).toThrow();
});

test('should create an aggregate field', () => {
  expect(
    sqlAstBuilder.astAggregateField('row_to_json', 'alias_name', 'j')
  ).toMatchSnapshot();
});

test('should create an aggregate field with scoped column', () => {
  expect(
    sqlAstBuilder.astAggregateField(
      'row_to_json',
      sqlAstBuilder.astIdentifier('table', 'alias_name'),
      'j'
    )
  ).toMatchSnapshot();
});
