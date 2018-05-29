import {
  GraphQLType,
  GraphQLString,
  GraphQLOutputType,
  GraphQLField,
  GraphQLFieldConfig
} from 'graphql';

export abstract class Field {
  constructor() {}

  abstract compileField(): GraphQLFieldConfig<any, any, any>;
}

export class StringField extends Field {
  compileField(): GraphQLFieldConfig<any, any, any> {
    return {
      type: GraphQLString
    };
  }
}
