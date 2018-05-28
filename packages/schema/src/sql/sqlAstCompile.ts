import * as Knex from 'knex';
import { AstQuery, AstNode } from './sqlAstTypes';

export function sqlAstCompile(
  knex: Knex,
  builder: Knex.QueryBuilder,
  ast: AstNode
) {
  switch (ast.type) {
    case 'Table':
      return ast.name;

    case 'Select':
      return builder
        .select(
          ...ast.columns.map(column => sqlAstCompile(knex, builder, column))
        )
        .from(sqlAstCompile(knex, builder, ast.from));

    case 'Field':
      return ast.as ? { [ast.name.name]: ast.as } : ast.name.name;

    case 'AggregateField':
      return knex.raw(`${ast.aggregate}(??) as ??`, [
        ast.name.name,
        ast.as ? ast.as.name : ast.name.name
      ]);

    case 'Identifier':
      return ast.name;

    case 'WrappedQuery':
      return (sqlAstCompile(
        knex,
        knex.queryBuilder(),
        ast.query
      ) as Knex.QueryBuilder).as(ast.as);
  }
}
