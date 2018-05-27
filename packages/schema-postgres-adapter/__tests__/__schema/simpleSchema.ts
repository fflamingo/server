import { Schema, makeGraphQLSchema } from '@fflamingo/schema';
import { SchemaFieldString } from '../../../schema/lib/schema/SchemaField';
import { GraphQLSchema } from 'graphql';
import { PostgresSchemaAdapter } from '../../src/PostgresSchemaAdapter';

export const usersSchema = new Schema({
  singular: 'user',
  fields: {
    name: new SchemaFieldString(),
    email: new SchemaFieldString()
  }
});

export const simpleSchema = makeGraphQLSchema([usersSchema], {
  adapter: new PostgresSchemaAdapter()
});
