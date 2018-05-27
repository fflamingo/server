import { Schema } from '../../src/schema/Schema';
import { SchemaField, SchemaFieldString } from '../../src/schema/SchemaField';

const userSchema = new Schema({
  singular: 'user',
  fields: {
    id: new SchemaFieldString()
  }
});

test('schema', () => {
  expect(userSchema).toBeInstanceOf(Schema);
  expect(userSchema.plural).toEqual('users');
  expect(userSchema.tableName).toEqual('users');
});
