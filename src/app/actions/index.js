import parseURI from '../../utils/parse-uri';
import joinUrl from '../../utils/join-url';
import config from '../../config/config';
import {storeStateInStorage} from '../state/local-storage';
import pingServer from './pingServer';

export const actions = {

  storeState: () => state => storeStateInStorage(state),

  page: event => () => {
    // The router is not compatible with latest HyperApp
    // Use this while waiting for the HyperApp router to catch up
    event.preventDefault();
    return {
      page: parseURI(event.target.href).path
    };
  },

  toggleGridLines: event => state => {
    event.preventDefault();
    return {
      gridLines: !state.gridLines
    };
  },

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
