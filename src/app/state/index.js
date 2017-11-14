import {getStateFromStorage} from './local-storage';

export const state = Object.assign(
  {
    page: '/',
    gridLines: true,
  },
  getStateFromStorage(),
  {
    response: 'Click the Ping button',
    unhandledErrorResponse: 'Click to trigger an unhandled error',
  }
);
