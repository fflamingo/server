import { Schema } from '../../src/schema/Schema';
import { SchemaField } from '../../src/schema/SchemaField';

const userSchema = new Schema({
  tableName: 'user',
  fields: {
    id: new SchemaField()
  }
});

test('schema', () => {
  expect(userSchema).toBeInstanceOf(Schema);
});
