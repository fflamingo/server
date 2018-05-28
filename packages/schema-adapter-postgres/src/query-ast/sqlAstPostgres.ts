import {
  sqlAstBuilder as sql,
  sqlAstTypes,
  getFromAliasName,
  AstIdentifier
} from '@fflamingo/schema';

export function astRowToJsonSelect(as: string, from: sqlAstTypes.AstFrom) {
  return sql.astSelect(from, [
    sql.astAggregateField('row_to_json', getFromAliasName(from), as)
  ]);
}

export function astCoalesce(identifier: string | AstIdentifier, as?: string) {
  return sql.astBinaryFunction(
    'coalesce',
    sql.astAggregateField('json_agg', identifier),
    sql.astLiteralValue('[]', 'json'),
    as
  );
}
