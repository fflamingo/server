import { Schema, makeGraphQLSchema } from '@fflamingo/schema';
import { GraphQLSchema } from 'graphql';
import { PostgresSchemaAdapter } from '../../src/PostgresSchemaAdapter';

export const usersSchema = new Schema({
  singular: 'user',
  fields: {
    name: new Schema.String(),
    email: new Schema.String()
  }
});

export const simpleSchema = makeGraphQLSchema([usersSchema], {
  adapter: new PostgresSchemaAdapter()
});
