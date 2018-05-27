import { Schema } from '../schema/Schema';
import { GraphQLResolveInfo } from 'graphql';
import { SchemasMap } from '../schema/makeGraphQLSchema';

/**
 * Adapter role is to convert a Schema-bound GraphQL AST to a JSON
 * final result.
 */
export class Adapter {
  constructor(protected schemas: SchemasMap) {}

  async fromAST(info: GraphQLResolveInfo): Promise<object> {
    throw new Error(
      'Adapter.fromAST should be implemented in derived classes.'
    );
  }
}
