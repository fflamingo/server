import { GraphQLType, GraphQLString, GraphQLOutputType } from 'graphql';

export abstract class SchemaField {
  constructor() {}

  abstract compile(): GraphQLOutputType;
}

export class SchemaFieldString extends SchemaField {
  compile(): GraphQLOutputType {
    return GraphQLString;
  }
}
