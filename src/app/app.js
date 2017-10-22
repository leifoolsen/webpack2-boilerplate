import {app} from 'hyperapp';

import config from '../config/config';
import logger from '../logger/logger';
import {actions} from './actions';
import {state} from './state';
import {view} from './views';

const run = () => {
  app({
    state,
    actions,
    view,
    init(/*state*/) {
      logger.info(`Application init, env: ${config.env}, public path: ${config.publicPath}, API path: ${config.apiPath}`);
    },
  });
};

export default run;
