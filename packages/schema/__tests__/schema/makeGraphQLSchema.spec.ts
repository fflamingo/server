import { Schema, Adapter } from '../../src';
import { SchemaFieldString } from '../../src/schema/SchemaField';
import { makeGraphQLSchema } from '../../src/schema/makeGraphQLSchema';

test('should create a simple schema and convert it to graphql', () => {
  const userSchema = new Schema({
    singular: 'user',
    fields: {
      name: new SchemaFieldString()
    }
  });

  const converted = makeGraphQLSchema(
    {
      users: userSchema
    },
    { adapter: Adapter }
  );
  expect(converted.getQueryType()!.name).toEqual('Query');
  expect(converted.getType('users')!.name).toEqual('users');
  expect(converted.getType('user')!.name).toEqual('user');
});
