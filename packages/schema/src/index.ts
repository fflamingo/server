export function makeSchema(str: string) {
  return str;
}

export { Schema } from './schema/Schema';
export { Adapter } from './adapter/Adapter';
export { makeGraphQLSchema } from './schema/makeGraphQLSchema';

import * as sql from './sql';
export { sql };
