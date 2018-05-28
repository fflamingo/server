export type AstNode =
  | AstFrom
  | AstQuery
  | AstColumn
  | AstIdentifier
  | AstLiteralValue;

export type AstFrom = AstTable | AstWrappedQuery;
export type AstQuery = AstSelect;
export type AstColumn = AstField | AstUnaryFunction | AstBinaryFunction;

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
  scope?: string;
  name: string;
}

export interface AstField {
  type: 'Field';
  name: AstIdentifier;
  as?: string;
}

export interface AstUnaryFunction {
  type: 'UnaryFunction';
  functionName: string;
  name: AstNode;
  as?: string;
}

export interface AstLiteralValue {
  type: 'LiteralValue';
  value: string;
  valueType: string;
}

export interface AstBinaryFunction {
  type: 'BinaryFunction';
  functionName: string;
  left: AstNode;
  right: AstNode;
  as?: string;
}
