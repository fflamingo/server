import { SchemaField } from './SchemaField';
import { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { mapValues } from 'lodash';
import pluralize from 'pluralize';

export interface SchemaDescriptor {
  singular: string;
  plural?: string;
  tableName?: string;
  fields: {
    [key: string]: SchemaField | Schema;
  };
}

export class Schema {
  singular: string;
  plural: string;

  tableName: string;
  fields: {
    [key: string]: SchemaField | Schema;
  };

  graphql: {
    objectType?: GraphQLObjectType;
  } = {};

  constructor(descriptor: SchemaDescriptor) {
    this.singular = descriptor.singular;
    this.plural = descriptor.plural || pluralize(descriptor.singular);
    this.tableName = descriptor.tableName || this.plural;
    this.fields = descriptor.fields;
  }

  protected compileType() {
    this.graphql.objectType = new GraphQLObjectType({
      name: this.tableName,
      fields: () => mapValues(this.fields, field => field.compileField())
    });
  }

  get objectType(): GraphQLObjectType {
    if (!this.graphql.objectType) this.compileType();

    return this.graphql.objectType!;
  }

  compileField(): GraphQLFieldConfig<any, any, any> {
    return {
      type: this.objectType
    };
  }
}
