import { SchemaField, SchemaFieldString } from './SchemaField';
import { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { mapValues } from 'lodash';
import pluralize from 'pluralize';

// Augments GraphQL Object type in order to store original Schema.
declare module 'graphql/type/definition' {
  interface GraphQLObjectTypeConfig<TSource, TContext> {
    sourceSchema?: Schema;
  }
  interface GraphQLObjectType {
    _typeConfig: GraphQLObjectTypeConfig<any, any>;
  }
}

export interface SchemaDescriptor {
  singular: string;
  plural?: string;
  tableName?: string;
  fields: {
    [key: string]: SchemaField | Schema;
  };
}

export class Schema {
  static String = SchemaFieldString;

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
      name: this.singular,
      sourceSchema: this,
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
