import { AstFrom } from './sqlAstTypes';

export function getFromAliasName(from: AstFrom) {
  switch (from.type) {
    case 'Table':
      return from.name;

    case 'WrappedQuery':
      return from.as;
  }
}
