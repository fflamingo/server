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
import util from 'util';
import { Schema, sqlAstBuilder as sql, sqlAstTypes } from '@fflamingo/schema';
import { astRowToJsonSelect, astCoalesce } from './sqlAstPostgres';

export interface ToQueryContext {
  parent: GraphQLObjectType;
  current: GraphQLOutputType;
  info: GraphQLResolveInfo;
}

/**
 * Converts a GraphQL queyr into an AST representation.
 */
export function graphqlToQuery(info: GraphQLResolveInfo) {
  return rootFieldToQuery(info.fieldNodes[0], info);
}

export function rootFieldToQuery(
  fieldNode: FieldNode,
  info: GraphQLResolveInfo
) {
  const rootField = info.schema.getQueryType()!.getFields()[
    fieldNode.name.value
  ];

  if (rootField == null)
    throw new Error(
      `Missing field "${fieldNode.name.value}" in root query type "${
        info.schema.getQueryType()!.name
      }"`
    );

  if (rootField.type instanceof GraphQLList) {
    return sql.astSelect(
      sql.astWrappedQuery(
        nodeToQuery(fieldNode, {
          info,
          parent: findObjectType(rootField.type)!,
          current: rootField.type
        }) as sqlAstTypes.AstSelect,
        'j'
      ),
      [astCoalesce('j', 'result')],
      true
    );
  }

  return astRowToJsonSelect(
    'result',
    sql.astWrappedQuery(
      nodeToQuery(fieldNode, {
        info,
        parent: findObjectType(rootField.type)!,
        current: rootField.type
      }) as sqlAstTypes.AstSelect,
      'j'
    )
  );
}

function findObjectType(
  outputType: GraphQLOutputType
): GraphQLObjectType | null {
  const unwrappedType = getNamedType(outputType);
  if (unwrappedType instanceof GraphQLObjectType) return unwrappedType;

  return null;
  // throw new Error('Parent object type not implemented for ' + parent);
}

export function nodeToQuery(fieldNode: FieldNode, ctx: ToQueryContext) {
  const objectType = findObjectType(ctx.current);
  // console.log(util.inspect(info, false, null));
  // console.log(info.schema.getType('user'));

  if (objectType) {
    return sql.astSelect(
      sql.astTable(objectType._typeConfig.sourceSchema!.tableName),
      selectionSetToQuery(fieldNode.selectionSet, ctx)
    );
  }

  return sql.astField(sql.astIdentifier(fieldNode.name.value));
  // console.log(util.inspect(info, false, null));
}

export function selectionSetToQuery(
  selectionSet: SelectionSetNode | undefined,
  ctx: ToQueryContext
) {
  if (selectionSet == null) return [];
  return selectionSet.selections.map(selection =>
    selectionNodeToQuery(selection, ctx)
  );
}

export function selectionNodeToQuery(
  selectionNode: FieldNode | InlineFragmentNode | FragmentSpreadNode,
  ctx: ToQueryContext
) {
  switch (selectionNode.kind) {
    case 'Field':
      return nodeToQuery(selectionNode, {
        ...ctx,
        current: findOutputTypeFromParent(selectionNode.name.value, ctx)
      });

    default:
      throw new Error('not implemented');
  }
}

function findOutputTypeFromParent(name: string, ctx: ToQueryContext) {
  return ctx.parent.getFields()[name].type;
}