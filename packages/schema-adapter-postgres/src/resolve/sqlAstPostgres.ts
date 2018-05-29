import {
  sqlAstBuilder as sql,
  sqlAstTypes,
  getFromAliasName,
  AstIdentifier
} from '@fflamingo/schema';

export function astRowToJson(identifier: string | AstIdentifier, as: string) {
  return sql.astUnaryFunction('row_to_json', identifier, as);
}

export function astCoalesce(identifier: string | AstIdentifier, as?: string) {
  return sql.astBinaryFunction(
    'coalesce',
    sql.astUnaryFunction('json_agg', identifier),
    sql.astLiteralValue('[]', 'json'),
    as
  );
}
