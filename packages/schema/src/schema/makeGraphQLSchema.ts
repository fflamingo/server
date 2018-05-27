import { Schema } from '../schema/Schema';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { mapValues } from 'lodash';
import { Adapter } from '..';

export interface SchemaGraphQLOptions {
  adapter: typeof Adapter;
}

export function makeGraphQLSchema(
  schemas: { [key: string]: Schema },
  options: SchemaGraphQLOptions
) {
  const adapter = new options.adapter(schemas);

  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: {
      ...mapValues(schemas, s => ({
        name: s.tableName,
        args: {},
        type: s.compile(),
        resolve: async (parent, args, context, resolveInfo) => {
          await adapter.fromAST(resolveInfo);
        }
      }))
    }
  });

  return new GraphQLSchema({
    query: queryType
  });
}
