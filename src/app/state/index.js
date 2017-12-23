import { location } from '@hyperapp/router';
import { getStateFromStorage } from './local-storage';

export const state = Object.assign(
  {
    location: location.state,
    gridLines: true,
    num: 0,
  },
  getStateFromStorage(),
  {
    response: 'Click to check server connection',
    unhandledErrorResponse: 'Click to trigger an unhandled error',
  }
);
