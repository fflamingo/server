import { Schema } from '../schema/Schema';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Adapter role is to convert a Schema-bound GraphQL AST to a JSON
 * final result.
 */
export class Adapter {
  constructor(protected schemas: { [key: string]: Schema }) {}

  async fromAST(info: GraphQLResolveInfo) {
    throw new Error(
      'Adapter.fromAST should be implemented in derived classes.'
    );
  }
}
