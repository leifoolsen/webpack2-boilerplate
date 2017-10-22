import joinUrl from '../../utils/join-url';
import config from '../../config/config';
import pingServer from './pingServer';

export const actions = {

  ping: (state, actions) => {
    pingServer(joinUrl(config.apiPath, '/ping'))
      .then(r => actions.setResponse(r));
  },

  setResponse: (state, actions, response) => ({response: response}),

  triggerUnhandledError: (state, actions) => {

    const badFunction = () => {
      const foo = {};
      return foo.bar(); // Throws "Script error"
    };

    // Show message before error is thrown
    actions.setUnhandledErrorResponse();
    badFunction();
  },

  setUnhandledErrorResponse: () => ({unhandledErrorResponse: 'Check your console and server log'}),

};
