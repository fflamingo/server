import { Schema } from '../schema/Schema';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { mapValues } from 'lodash';
import { Adapter } from '../adapter/Adapter';
import { assign } from 'lodash';

export interface SchemaGraphQLOptions {
  adapter: Adapter;
}

export function makeGraphQLSchema(
  schemas: Schema[],
  options: SchemaGraphQLOptions
) {
  const adapter = options.adapter;

  const queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () =>
      assign({}, ...schemas.map(schema => makeGraphQLFields(adapter, schema)))
  });

  return new GraphQLSchema({
    query: queryType
  });
}

function makeGraphQLFields(adapter: Adapter, schema: Schema) {
  return {
    [schema.singular]: {
      type: schema.objectType,
      args: {}, // todo
      resolve(parent, args, context, resolveInfo) {
        return adapter.fromAST(resolveInfo);
      }
    },
    [schema.plural]: {
      type: new GraphQLList(schema.objectType),
      args: {},
      resolve(parent, args, context, resolveInfo) {
        return adapter.fromAST(resolveInfo);
      }
    }
  };
}
