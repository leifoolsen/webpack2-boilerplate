import { getStateFromStorage } from './local-storage';

export const state = Object.assign(
  {
    page: '/',
    gridLines: true,
    num: 0,
  },
  getStateFromStorage(),
  {
    response: 'Click the Ping button',
    unhandledErrorResponse: 'Click to trigger an unhandled error',
  }
);
