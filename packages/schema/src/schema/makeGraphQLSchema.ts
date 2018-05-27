import { Schema } from '../schema/Schema';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { mapValues } from 'lodash';
import { Adapter } from '..';

export interface SchemaGraphQLOptions {
  adapter: typeof Adapter;
}

export type SchemasMap = { [key: string]: Schema };

export function makeGraphQLSchema(
  schemas: SchemasMap,
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
          return await adapter.fromAST(resolveInfo);
        }
      }))
    }
  });

  return new GraphQLSchema({
    query: queryType
  });
}
