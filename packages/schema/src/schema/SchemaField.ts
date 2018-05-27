import {
  GraphQLType,
  GraphQLString,
  GraphQLOutputType,
  GraphQLField,
  GraphQLFieldConfig
} from 'graphql';

export abstract class SchemaField {
  constructor() {}

  abstract compileField(): GraphQLFieldConfig<any, any, any>;
}

export class SchemaFieldString extends SchemaField {
  compileField(): GraphQLFieldConfig<any, any, any> {
    return {
      type: GraphQLString
    };
  }
}
