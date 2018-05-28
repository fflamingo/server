import { Schema, Adapter, sqlAstCompile } from '@fflamingo/schema';
import { GraphQLResolveInfo } from 'graphql';
import { graphqlToQuery } from './query-ast/graphqlToQuery';
import * as Knex from 'knex';
import util from 'util';

export class PostgresSchemaAdapter extends Adapter {
  database: Knex;

  constructor(database: Knex) {
    super();
    this.database = database;
  }

  async fromAST(info: GraphQLResolveInfo) {
    const ast = await graphqlToQuery(info);
    console.log('ast is', util.inspect(ast, false, null));
    const query = sqlAstCompile(this.database, ast) as Knex.QueryBuilder;
    console.log('result from query is\n', query.toString());
    const result = await query;
    console.log('query result is', util.inspect(result, false, null));
    return result.result;
  }
}
