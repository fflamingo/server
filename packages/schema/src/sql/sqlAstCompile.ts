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
    /**
     * A table is used right inside `Select` from statement, so we
     * should just forward its name.
     */
    case 'Table':
      return ast.name;

    /**
     * Select is main query entry point. Select actually could be compiled
     * as first (i.e. with `limit 1` implementation), dependening on
     * `ast.first`.
     *
     * Each column is compiled recursively.
     */
    case 'Select':
      return builder[ast.first ? 'first' : 'select'](
        ...ast.columns.map(column => sqlAstCompile(knex, column, builder))
      ).from(sqlAstCompile(knex, ast.from, builder));

    /**
     * A simple field, to be used as column reference or computation. Name
     * could be an identifier, so its forwarded recursively.
     */
    case 'Field': {
      const fieldName = sqlAstCompile(knex, ast.name);
      return ast.as ? { [ast.as]: fieldName } : fieldName;
    }

    /**
     * Unary function like `json_agg(??)` or `sum(??) as total_price`
     */
    case 'UnaryFunction': {
      assertValidFunctionName(ast.functionName);
      const paramName = sqlAstCompile(knex, ast.name);
      return ast.as
        ? knex.raw(`${ast.functionName}(??) as ??`, [paramName, ast.as])
        : knex.raw(`${ast.functionName}(??)`, [paramName]);
    }

    /**
     * Binary function like `coalesce(??, '[]'::json)`
     */
    case 'BinaryFunction': {
      assertValidFunctionName(ast.functionName);
      const left = sqlAstCompile(knex, ast.left);
      const right = sqlAstCompile(knex, ast.right);
      return ast.as
        ? knex.raw(`${ast.functionName}(??, ??) as ??`, [left, right, ast.as])
        : knex.raw(`${ast.functionName}(??, ??)`, [left, right]);
    }

    /**
     * Representa a literal value, casted to a specific valueType.
     */
    case 'LiteralValue': {
      return knex.raw(`'${ast.value}'::${ast.valueType}`);
    }

    case 'Identifier':
      return ast.scope ? `${ast.scope}.${ast.name}` : ast.name;

    /**
     * A wrapped Query uses a new `queryBuilder` to build corresponding
     * sql statement. It is then wrapped with `ast.as` identifier
     */
    case 'WrappedQuery':
      return sqlAstCompile(knex, ast.query, knex.queryBuilder()).as(ast.as);
  }
}

const VALID_FUNCTION_NAME_REGEX = /^[a-zA-Z_]+$/;

/**
 * Validates function name.
 */
export function assertValidFunctionName(functionName: string): void {
  if (!VALID_FUNCTION_NAME_REGEX.test(functionName)) {
    throw new Error(`"${functionName}" is not a valid functionName.`);
  }
}
