import { graphqlToQuery } from '../../src/query-ast/graphqlToQuery';
import { simpleSchema } from '../__schema/simpleSchema';
import { graphql } from 'graphql';
import gql from 'graphql-tag';

const query = `
  query MyQuery {
    users {
      name
      email
    }
  }
`;

test('should convert simple query to SQL Ast', async () => {
  const result = await graphql(simpleSchema, query);
  expect(result).not.toBe(null);
});
