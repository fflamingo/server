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
      sql.astAggregateField('row_to_json', 'column', 'final')
    ).toString()
  ).toEqual(`row_to_json("column") as "final"`);
});
