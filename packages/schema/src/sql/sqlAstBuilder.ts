import {
  AstTable,
  AstFrom,
  AstColumn,
  AstSelect,
  AstField,
  AstIdentifier,
  AstAggregateField,
  AstQuery,
  AstWrappedQuery
} from './sqlAstTypes';

export function astTable(name: string): AstTable {
  return {
    type: 'Table',
    name
  };
}

export function astSelect(
  from: AstFrom,
  columns: AstColumn[],
  first?: boolean
): AstSelect {
  return {
    type: 'Select',
    from,
    columns,
    first
  };
}

export function astWrappedQuery(query: AstQuery, as: string): AstWrappedQuery {
  return {
    type: 'WrappedQuery',
    query,
    as
  };
}

export function astField(name: AstIdentifier, as?: AstIdentifier): AstField {
  return {
    type: 'Field',
    name,
    as
  };
}

export function astAggregateField(
  aggregate: string,
  name: AstIdentifier,
  as?: AstIdentifier
): AstAggregateField {
  return {
    type: 'AggregateField',
    aggregate,
    name,
    as
  };
}

export function astIdentifier(name: string): AstIdentifier {
  return {
    type: 'Identifier',
    name
  };
}
