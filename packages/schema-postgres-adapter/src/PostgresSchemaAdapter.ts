import { Schema, Adapter } from '@fflamingo/schema';
import { GraphQLResolveInfo } from 'graphql';
import { graphqlToQuery } from './query-ast/graphqlToQuery';

export class PostgresSchemaAdapter extends Adapter {
  async fromAST(info: GraphQLResolveInfo) {
    const items = await graphqlToQuery(info);
    console.log('result from query is', items);
    return [{ email: 'aa aa', name: 'BBB' }];
  }
}
