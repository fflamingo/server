import { Schema } from '../schema/Schema';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
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
    name: 'Query',
    description: 'Root query object',
    fields: () => ({
      ...mapValues(schemas, s => ({
        name: s.singular,
        args: {},
        type: s.objectType,
        async resolve(parent, args, context, resolveInfo) {
          console.log('Resolving ', parent);
          const r = await adapter.fromAST(resolveInfo);
          console.log('Returns', r);
          return r;
        }
      })),
      ...mapValues(schemas, s => ({
        name: s.plural,
        args: {},
        type: new GraphQLList(s.objectType),
        async resolve(parent, args, context, resolveInfo) {
          console.log('Resolving ', parent);
          const r = await adapter.fromAST(resolveInfo);
          console.log('Returns', r);
          return r;
        }
      }))
    })
  });

  return new GraphQLSchema({
    query: queryType
  });
}
