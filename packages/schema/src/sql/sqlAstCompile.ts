import * as Knex from 'knex';
import { AstQuery, AstNode } from './sqlAstTypes';

/**
 * Given a knex instance, compiles the SQL AST into an executable
 * query that can be executed.
 *
 * @returns Knex.QueryBuilder
 */
export function sqlAstCompile(
  knex: Knex,
  ast: AstNode,
  builder: Knex.QueryBuilder = knex.queryBuilder()
) {
  switch (ast.type) {
    case 'Table':
      return ast.name;

    case 'Select':
      return builder
        .select(
          ...ast.columns.map(column => sqlAstCompile(knex, column, builder))
        )
        .from(sqlAstCompile(knex, ast.from, builder));

    case 'Field': {
      const fieldName = sqlAstCompile(knex, ast.name);
      return ast.as ? { [ast.as]: fieldName } : fieldName;
    }

    case 'AggregateField': {
      const paramName = sqlAstCompile(knex, ast.name);
      return knex.raw(`${ast.aggregate}(??) as ??`, [paramName, ast.as]);
    }

    case 'Identifier':
      return ast.scope ? `${ast.scope}.${ast.name}` : ast.name;

    case 'WrappedQuery':
      return sqlAstCompile(knex, ast.query).as(ast.as);
  }
}
