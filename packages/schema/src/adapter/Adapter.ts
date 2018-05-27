import { Schema } from '../schema/Schema';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Adapter role is to convert a Schema-bound GraphQL AST to a JSON
 * final result.
 */
export class Adapter {
  async fromAST(info: GraphQLResolveInfo): Promise<object> {
    throw new Error(
      'Adapter.fromAST should be implemented in derived classes.'
    );
  }
}
