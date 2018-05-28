export type AstNode = AstFrom | AstQuery | AstColumn | AstIdentifier;

export type AstFrom = AstTable | AstWrappedQuery;
export type AstQuery = AstSelect;
export type AstColumn = AstField | AstAggregateField;

export interface AstTable {
  type: 'Table';
  name: string;
}

export interface AstSelect {
  type: 'Select';
  from: AstFrom;
  columns: AstColumn[];
  first?: boolean;
}

export interface AstWrappedQuery {
  type: 'WrappedQuery';
  query: AstQuery;
  as: string;
}

export interface AstIdentifier {
  type: 'Identifier';
  name: string;
}

export interface AstField {
  type: 'Field';
  name: AstIdentifier;
  as?: AstIdentifier;
}

export interface AstAggregateField {
  type: 'AggregateField';
  aggregate: string;
  name: AstIdentifier;
  as?: AstIdentifier;
}
