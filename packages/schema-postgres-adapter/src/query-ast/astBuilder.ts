import {
  ASTTable,
  ASTFrom,
  ASTColumn,
  ASTSelect,
  ASTField,
  ASTIdentifier
} from './QueryASTTypes';

export function astTable(name: string): ASTTable {
  return {
    type: 'Table',
    name
  };
}

export function astSelect(
  from: ASTFrom,
  columns: ASTColumn[],
  first?: boolean
): ASTSelect {
  return {
    type: 'Select',
    from,
    columns,
    first
  };
}

export function astField(name: ASTIdentifier, as?: ASTIdentifier): ASTField {
  return {
    type: 'Field',
    name: name,
    as
  };
}

export function astIdentifier(name: string): ASTIdentifier {
  return {
    type: 'Identifier',
    name
  };
}
