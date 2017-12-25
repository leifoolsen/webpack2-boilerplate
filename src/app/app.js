import './styles/base/helpers.css';
import './styles/base/colors.css';
import './styles/base/typography.css';
import { app } from 'hyperapp';
import { location } from '@hyperapp/router';
import { state } from './state';
import { actions } from './actions';
import { view } from './views';
import config from '../config/config';
import logger from '../logger/logger';

const run = () => {

  /*
  const {
    storeState,
  } = app(
    state,
    actions,
    view,
    document.body,
  );
  */

  const main = app(state, actions, view, document.body);

  const unsubscribe = location.subscribe(main.location);

  window.addEventListener('beforeunload', () => {
    main.storeState();
    unsubscribe();
  });

  logger.info(`Application started, env: ${config.env}, public path: ${config.publicPath}, API path: ${config.apiPath}`);
};

export default run;
