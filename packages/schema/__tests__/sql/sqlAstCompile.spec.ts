import knex from 'knex';
import { sqlAstBuilder as sql, sqlAstCompile } from '../../src';

const db = knex({ client: 'pg' });

test('should create a select expression', () => {
  expect(
    sqlAstCompile(
      db,
      sql.astSelect(sql.astTable('users'), [
        sql.astField(sql.astIdentifier('email')),
        sql.astField(sql.astIdentifier('name'))
      ])
    ).toString()
  ).toMatchSnapshot();
});

test('should create a wrapped query expression', () => {
  expect(
    sqlAstCompile(
      db,
      sql.astSelect(
        sql.astWrappedQuery(
          sql.astSelect(sql.astTable('users'), [
            sql.astField(sql.astIdentifier('original_name'))
          ]),
          'original_users'
        ),
        [
          sql.astField(
            sql.astIdentifier('original_users', 'name'),
            'original_name'
          ),
          sql.astField('original_name')
        ]
      )
    ).toString()
  ).toMatchSnapshot();
});

test('should compile an aggregate function', () => {
  expect(
    sqlAstCompile(
      db,
      sql.astUnaryFunction('row_to_json', 'column', 'final')
    ).toString()
  ).toEqual(`row_to_json("column") as "final"`);
});

test('should fail with invalid function name', () => {
  expect(() =>
    sqlAstCompile(db, sql.astUnaryFunction('what?', 'column'))
  ).toThrow(/valid/);
});

describe('binary function', () => {
  test('should compile a binary function', () => {
    expect(
      sqlAstCompile(
        db,
        sql.astBinaryFunction(
          'coalesce',
          sql.astUnaryFunction('json_agg', 'pippo'),
          sql.astLiteralValue('[]', 'json')
        )
      ).toString()
    ).toEqual(`coalesce(json_agg("pippo"), '[]'::json)`);
  });

  test('should compile even with as identifier', () => {
    expect(
      sqlAstCompile(
        db,
        sql.astBinaryFunction(
          'coalesce',
          sql.astIdentifier('demo_field'),
          sql.astLiteralValue('10', 'int'),
          'demo_field_int'
        )
      ).toString()
    ).toEqual(`coalesce("demo_field", '10'::int) as "demo_field_int"`);
  });
});
