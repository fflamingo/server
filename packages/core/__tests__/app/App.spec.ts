jest.mock('express', () =>
  jest.fn().mockImplementation(() => ({
    use: jest.fn()
  }))
);

import express from 'express';
import { App } from '../../src/app/App';

test('should create application', () => {
  const app = new App();
  expect(express).toHaveBeenCalled();
  expect(app.expressApplication.use).toHaveBeenCalled();
});
