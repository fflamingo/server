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

export function astField(name: string | AstIdentifier, as?: string): AstField {
  return {
    type: 'Field',
    name: expandIdentifier(name),
    as
  };
}

export function astAggregateField(
  aggregate: string,
  name: string | AstIdentifier,
  as: string
): AstAggregateField {
  return {
    type: 'AggregateField',
    aggregate,
    name: expandIdentifier(name),
    as
  };
}

/**
 * Accepts both format:
 *
 *  - astIdentifier("table", "column") -> "table"."column"
 *  - astIdentifier("column") -> "column"
 */
export function astIdentifier(
  name: string,
  scopedName?: string
): AstIdentifier {
  if (name.indexOf('.') >= 0 || (scopedName && scopedName.indexOf('.') >= 0)) {
    throw new Error(
      `In order to use a "." separator inside name "${name}" or "${scopedName}", use "astIdentifier()" constructor`
    );
  }

  return {
    type: 'Identifier',
    name: scopedName == null ? name : scopedName,
    scope: scopedName == null ? undefined : name
  };
}

// Utilities
function expandIdentifier(name: string | AstIdentifier) {
  if (typeof name === 'object') return name;
  return astIdentifier(name);
}
