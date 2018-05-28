import { AstFrom } from './sqlAstTypes';

/**
 * Given a `from` AST expression returns the alias name needed to reference it
 * in the parent Query.
 */
export function getFromAliasName(from: AstFrom) {
  switch (from.type) {
    case 'Table':
      return from.name;

    case 'WrappedQuery':
      return from.as;
  }
}
