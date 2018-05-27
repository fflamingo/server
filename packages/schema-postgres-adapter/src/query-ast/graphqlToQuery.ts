import {
  GraphQLResolveInfo,
  FieldNode,
  SelectionSetNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  GraphQLObjectType,
  GraphQLList,
  GraphQLOutputType
} from 'graphql';
import util from 'util';
import { Schema } from '@fflamingo/schema';
import * as builder from './astBuilder';
import { ASTField, ASTSelect } from './QueryASTTypes';

export interface ToQueryContext {
  parent: GraphQLOutputType;
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

  return nodeToQuery(fieldNode, { parent: rootField.type }, info);
}

function findParentObjectType(
  parent: GraphQLOutputType
): GraphQLObjectType | null {
  if (parent instanceof GraphQLList) return parent.ofType;
  if (parent instanceof GraphQLObjectType) return parent;

  return null;
  // throw new Error('Parent object type not implemented for ' + parent);
}

export function nodeToQuery(
  fieldNode: FieldNode,
  ctx: ToQueryContext,
  info: GraphQLResolveInfo
) {
  const objectType = findParentObjectType(ctx.parent);
  // console.log(util.inspect(info, false, null));
  // console.log(info.schema.getType('user'));

  if (objectType) {
    console.log('Found schema');
    return builder.astSelect(
      builder.astTable(objectType._typeConfig.sourceSchema!.tableName),
      selectionSetToQuery(fieldNode.selectionSet, info),
      !(ctx.parent instanceof GraphQLList)
    );
  }

  return fieldNode.name.value;
  // console.log(util.inspect(info, false, null));
}

export function selectionSetToQuery(
  selectionSet: SelectionSetNode | undefined,
  info: GraphQLResolveInfo
) {
  if (selectionSet == null) return [];
  return selectionSet.selections.map(selection =>
    selectionNodeToQuery(selection, info)
  );
}

export function selectionNodeToQuery(
  selectionNode: FieldNode | InlineFragmentNode | FragmentSpreadNode,
  info: GraphQLResolveInfo
) {
  switch (selectionNode.kind) {
    case 'Field':
      return builder.astField(builder.astIdentifier(selectionNode.name.value));

    default:
      throw new Error('not implemented');
  }
}
