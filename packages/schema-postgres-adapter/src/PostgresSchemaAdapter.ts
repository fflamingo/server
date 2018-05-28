import { Schema, Adapter, sql } from '@fflamingo/schema';
import { GraphQLResolveInfo } from 'graphql';
import { graphqlToQuery } from './query-ast/graphqlToQuery';
import knex from 'knex';
import util from 'util';

export class PostgresSchemaAdapter extends Adapter {
  database;
  constructor() {
    super();
    this.database = knex({ client: 'pg' });
  }

  async fromAST(info: GraphQLResolveInfo) {
    const ast = await graphqlToQuery(info);
    console.log('ast is', util.inspect(ast, false, null));
    const query = sql.astCompile(
      this.database,
      this.database.queryBuilder(),
      ast
    );
    console.log('result from query is\n', query.toSQL());
    return [{ email: 'aa aa', name: 'BBB' }];
  }
}
