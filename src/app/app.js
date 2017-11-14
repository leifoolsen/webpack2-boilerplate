import './styles/base/base.css';
import './styles/base/typography.css';
import './styles/base/helpers.css';

import {app} from 'hyperapp';

import config from '../config/config';
import logger from '../logger/logger';
import { actions } from './actions';
import { state } from './state';
import { view } from './views';

const run = () => {

  const dispatch = app({
    state,
    actions,
    view
  });

  logger.info(`Application started, env: ${config.env}, public path: ${config.publicPath}, API path: ${config.apiPath}`);

  window.addEventListener('beforeunload', () => dispatch.storeState());
};

export default run;
