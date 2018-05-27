export type ASTFrom = ASTTable;

export interface ASTTable {
  type: 'Table';
  name: string;
}

export interface ASTSelect {
  type: 'Select';
  from: ASTFrom;
  columns: ASTColumn[];
  first?: boolean;
}

export interface ASTIdentifier {
  type: 'Identifier';
  name: string;
}

export interface ASTField {
  type: 'Field';
  name: ASTIdentifier;
  as?: ASTIdentifier;
}

export type ASTColumn = ASTField;
