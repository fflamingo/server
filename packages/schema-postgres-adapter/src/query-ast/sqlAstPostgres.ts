import {
  sqlAstBuilder as sql,
  sqlAstTypes,
  getFromAliasName
} from '@fflamingo/schema';

export function astRowToJsonSelect(as: string, from: sqlAstTypes.AstFrom) {
  return sql.astSelect(from, [
    sql.astAggregateField(
      'row_to_json',
      sql.astIdentifier(getFromAliasName(from)),
      sql.astIdentifier(as)
    )
  ]);
}
