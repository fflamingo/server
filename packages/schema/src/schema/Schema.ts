import { SchemaField } from './SchemaField';
import { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { mapValues } from 'lodash';

export interface SchemaDescriptor {
  tableName: string;
  fields: {
    [key: string]: SchemaField | Schema;
  };
}

export class Schema {
  tableName: string;
  fields: {
    [key: string]: SchemaField | Schema;
  };

  constructor(descriptor: SchemaDescriptor) {
    this.tableName = descriptor.tableName;
    this.fields = descriptor.fields;
  }

  compile(): GraphQLObjectType {
    return new GraphQLObjectType({
      name: this.tableName,
      fields: mapValues(this.fields, field => ({
        type: field.compile()
      }))
    });
  }
}
