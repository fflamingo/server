export function makeSchema(str: string) {
  return str;
}

export { Schema } from './schema/Schema';
export { Adapter } from './adapter/Adapter';
export { makeGraphQLSchema } from './schema/makeGraphQLSchema';

// SQL

import * as sqlAstTypes from './sql/sqlAstTypes';
import * as sqlAstBuilder from './sql/sqlAstBuilder';
export { sqlAstTypes, sqlAstBuilder };
export * from './sql/sqlAstTypes';
export { getFromAliasName } from './sql/sqlAstTraversal';
export { sqlAstCompile } from './sql/sqlAstCompile';
