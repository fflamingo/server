import { setupDb, clearDb } from '../__schema/setupDb';
import { simpleSchema } from '../__schema/simpleSchema';
import { graphql, parse } from 'graphql';
import gql from 'graphql-tag';
import util from 'util';
import { selectionNodeToQuery } from '../../src/resolve/resolveSqlAst';

beforeAll(setupDb);
afterAll(clearDb);

test('should convert simple query to SQL Ast', async () => {
  const query = `
    query MyQuery {
      users {
        name
        email
      }
    }
  `;
  const result = await graphql(simpleSchema, query);
  // console.log('result is', util.inspect(result, false, null));
  expect(result).toMatchSnapshot();
});

test('should build a single entity query', async () => {
  const query = `
    query MyQuery {
      user {
        name
        email
      }
    }
  `;
  const result = await graphql(simpleSchema, query);
  expect(result).toMatchSnapshot();
});

test('should not allow an unexisting root field', async () => {
  const result = await graphql(
    simpleSchema,
    `
      query UnexistingRootField {
        bohs {
          name
          email
        }
      }
    `
  );
  expect(result.errors![0].message).toEqual(
    `Cannot query field "bohs" on type "Query".`
  );
});

test('should not allow an unexisting schema object field', async () => {
  const result = await graphql(
    simpleSchema,
    `
      query UnexistingSchemaField {
        users {
          name
          what
        }
      }
    `
  );
  expect(result.errors![0].message).toEqual(
    `Cannot query field "what" on type "user".`
  );
});

describe('fragments', () => {
  // regression
  test('failing: should handle fragments', () => {
    expect(() =>
      selectionNodeToQuery(
        {
          kind: 'InlineFragmentNode'
        } as any,
        {} as any
      )
    ).toThrow();
  });
});
