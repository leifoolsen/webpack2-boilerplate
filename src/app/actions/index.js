import { location } from '@hyperapp/router';
import joinUrl from '../../utils/join-url';
import config from '../../config/config';
import {storeStateInStorage} from '../state/local-storage';
import pingServer from './pingServer';

export const actions = {

  location: location.actions,

  storeState: () => state => storeStateInStorage(state),

  toggleGridLines: event => state => {
    event.preventDefault();
    return {
      gridLines: !state.gridLines
    };
  },

  add: () => ({ num }) => ({ num: num + 1 }),

  sub: () => ({ num }) => ({ num: num - 1 }),

  ping: event => (state, actions) => {
    event.preventDefault();
    pingServer(joinUrl(config.apiPath, '/ping'))
      .then(r => actions.setResponse(r));
  },

  setResponse: response => ({response}),

  triggerUnhandledError: event => (state, actions) => {

    const badFunction = () => {
      const foo = {};
      return foo.bar(); // Throws "Script error"
    };

    event.preventDefault();

    // Set message before error is thrown
    actions.setUnhandledErrorResponse();

    badFunction();
  },

  setUnhandledErrorResponse: () => ({unhandledErrorResponse: 'Check your console and server log'}),
};
