import { sql } from '@fflamingo/schema';

const { astBuilder } = sql;

export function astRowToJsonSelect(as: string, from: sql.astTypes.AstFrom) {
  return astBuilder.astSelect(from, [
    astBuilder.astAggregateField(
      'row_to_json',
      astBuilder.astIdentifier(sql.findAstFromAliasName(from)),
      astBuilder.astIdentifier(as)
    )
  ]);
}
