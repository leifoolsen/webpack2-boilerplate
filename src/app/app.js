import './styles/base/helpers.css';
import './styles/base/custom-media.css';
import './styles/base/colors.css';
import './styles/base/typography.css';
import './styles/layout/layout.css';
import './styles/app/masthead.css';
import './styles/app/mastfoot.css';
import { app } from 'hyperapp';
import { actions } from './actions';
import { state } from './state';
import { view } from './views';
import config from '../config/config';
import logger from '../logger/logger';

const run = () => {

  const main = app({
    state,
    actions,
    view
  });

  logger.info(`Application started, env: ${config.env}, public path: ${config.publicPath}, API path: ${config.apiPath}`);

  window.addEventListener('beforeunload', () => main.storeState());
};

export default run;
