import './styles/base/helpers.css';
import './styles/base/custom-media.css';
import './styles/base/colors.css';
import './styles/base/typography.css';
import './styles/layout/layout.css';
import './styles/app/masthead.css';
import './styles/app/mastfoot.css';
import { app } from 'hyperapp';
import { state } from './state';
import { actions } from './actions';
import { view } from './views';
import config from '../config/config';
import logger from '../logger/logger';

const run = () => {

  const {
    storeState,
  } = app(
    state,
    actions,
    view,
    document.body,
  );

  window.addEventListener('beforeunload', () => storeState());

  logger.info(`Application started, env: ${config.env}, public path: ${config.publicPath}, API path: ${config.apiPath}`);
};

export default run;
