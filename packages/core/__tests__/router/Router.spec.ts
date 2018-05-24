jest.mock('../../src/app/bindApp', () => ({
  getLocalsReq: jest.fn(),
  getLocalsRes: jest.fn()
}));

import express from 'express';
import { Router } from '../../src/router/Router';
import {
  FFLAMINGO_LOCALS_KEY,
  getLocalsReq,
  getLocalsRes
} from '../../src/app/bindApp';

beforeEach(() => {
  jest.clearAllMocks();
});

test('should create a new router', () => {
  const router = new Router();
  expect(router.expressRouter).not.toBeNull();
});

test('should allow chained interface', () => {
  const router = new Router();
  expect(router.get('test/', (req, res) => res)).toBe(router);
});

test('should allow shorthand notation', () => {
  const router = Router.create();
  expect(router).toBeInstanceOf(Router);
});

test('should bind `use` middlewares', () => {
  const router = new Router();

  router.expressRouter.use = jest.fn(handler => handler());
  router.use((req, res, next) => {});
  expect(router.expressRouter.use).toHaveBeenCalledTimes(1);
  expect(getLocalsReq).toHaveBeenCalledTimes(1);
  expect(getLocalsRes).toHaveBeenCalledTimes(1);
});

test('should bind `get` handler', () => {
  const router = new Router();
  router.expressRouter.get = jest.fn((path, handler) => handler());
  router.get('path', (req, res) => res);
  expect(router.expressRouter.get).toHaveBeenCalledWith(
    'path',
    expect.any(Function)
  );
  expect(getLocalsReq).toHaveBeenCalledTimes(1);
  expect(getLocalsRes).toHaveBeenCalledTimes(1);
});
