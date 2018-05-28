import { setupDb, clearDb } from '../__schema/setupDb';
import { graphqlToQuery } from '../../src/query-ast/graphqlToQuery';
import { simpleSchema } from '../__schema/simpleSchema';
import { graphql, parse } from 'graphql';
import gql from 'graphql-tag';
import util from 'util';

const query = `
  query MyQuery {
    users {
      name
      email
    }
  }
`;

beforeAll(setupDb);
afterAll(clearDb);

test('should convert simple query to SQL Ast', async () => {
  const result = await graphql(simpleSchema, query);
  // console.log('ast from gql is', util.inspect(parseResult, false, null));
  console.log('result is', result);
  expect(result).not.toBe(null);
});
