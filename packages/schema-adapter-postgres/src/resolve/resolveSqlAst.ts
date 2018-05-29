import {
  GraphQLResolveInfo,
  FieldNode,
  SelectionSetNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  GraphQLObjectType,
  GraphQLList,
  GraphQLOutputType,
  getNamedType
} from 'graphql';
import { Schema, sqlAstBuilder as sql, sqlAstTypes } from '@fflamingo/schema';
import { astCoalesce, astRowToJson } from './sqlAstPostgres';
import invariant from 'invariant';
import util from 'util';

export interface ToQueryContext {
  /** Real parent object as defined by schema */
  parent: GraphQLOutputType;
  /** Parent ObjectType, derived by the schema */
  parentObject: GraphQLObjectType;
  info: GraphQLResolveInfo;
}

/**
 * Converts a GraphQL query into an SQL AST representation, that could
 * be then compiled and executed against DB.
 */
export function resolveSqlAst(info: GraphQLResolveInfo) {
  invariant(
    info.fieldNodes.length === 1,
    `graphqlToQuery handles only one fieldNode actually %s`,
    info.fieldNodes.length
  );

  return rootFieldToQuery(info.fieldNodes[0], info);
}

/**
 * Depending on root field type, we create the SQL AST output query.
 */
export function rootFieldToQuery(
  fieldNode: FieldNode,
  info: GraphQLResolveInfo
) {
  const queryType = info.schema.getQueryType()!;
  const rootField = queryType.getFields()[fieldNode.name.value];

  if (rootField == null)
    throw new Error(
      `Missing field "${fieldNode.name.value}" in root query type "${
        info.schema.getQueryType()!.name
      }"`
    );

  /**
   * Depending on rootField type (List/ObjectType) we change the SQL AST
   * aggregation function. query will stay the same, and eventually handled
   * by `nodeToQuery`
   */
  const isList = rootField.type instanceof GraphQLList;

  return sql.astSelect(
    sql.astWrappedQuery(
      nodeToQuery(fieldNode, {
        info,
        parent: queryType,
        parentObject: queryType
      }) as sqlAstTypes.AstSelect,
      'j'
    ),
    // switch based on list / record
    isList ? [astCoalesce('j', 'result')] : [astRowToJson('j', 'result')],
    true
  );
}

/**
 * Finds object type from an output type. Used to resolve `parent` objectType
 * from resolve info.
 */
function findObjectType(
  outputType: GraphQLOutputType
): GraphQLObjectType | null {
  const unwrappedType = getNamedType(outputType);
  if (unwrappedType instanceof GraphQLObjectType) return unwrappedType;

  return null;
  // throw new Error('Parent object type not implemented for ' + parent);
}

/**
 * Given current fieldNode and execution context (passed recursively with
 * `ctx`), derives the SQL AST operation needed in order to fetch the fieldNode.
 *
 * This is the main entry point where we should process Output Types and
 * eventually convert them.
 */
export function nodeToQuery(fieldNode: FieldNode, ctx: ToQueryContext) {
  const fieldName = fieldNode.name.value;
  const fieldConfig = ctx.parentObject.getFields()[fieldName];

  if (!fieldConfig) {
    throw new Error(
      `Field "${fieldName}" is not defined for parent ObjectType "${
        ctx.parentObject.name
      }"`
    );
  }

  // if we find an objectType, so it should be a table.
  // FIXME: handle relationships.
  const objectType = findObjectType(fieldConfig.type);
  if (objectType) {
    // FIXME: handle other types
    invariant(
      objectType._typeConfig.sourceSchema != null,
      'graphqlToQuery handles only objectTypes defined by "Schema" instances'
    );

    return sql.astSelect(
      sql.astTable(objectType._typeConfig.sourceSchema!.tableName),
      selectionSetToQuery(fieldNode.selectionSet, {
        ...ctx,
        parent: fieldConfig.type,
        parentObject: objectType
      })
    );
  }

  // returns just a plain old field (column, in this context).
  return sql.astField(sql.astIdentifier(fieldName));
}

/**
 * Given a fieldNode selection set, process its selectionSet applying
 * `nodeToQuery` recursively.
 */
export function selectionSetToQuery(
  selectionSet: SelectionSetNode | undefined,
  ctx: ToQueryContext
) {
  if (selectionSet == null) return [];
  return selectionSet.selections.map(selection =>
    selectionNodeToQuery(selection, ctx)
  );
}

/**
 * Since nodes may be different respect to `FieldNode`, we support
 * other types like fragment & spread.
 *
 * @todo support them!
 */
export function selectionNodeToQuery(
  selectionNode: FieldNode | InlineFragmentNode | FragmentSpreadNode,
  ctx: ToQueryContext
) {
  switch (selectionNode.kind) {
    case 'Field':
      return nodeToQuery(selectionNode, ctx);

    default:
      throw new Error(
        `SelectionNode "${selectionNode.kind}" is not implemented`
      );
  }
}
