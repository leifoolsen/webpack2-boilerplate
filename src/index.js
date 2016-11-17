import './stylesheets/main.scss';

// es6 generator support
import 'babel-polyfill';

import App from './app/app';

// Start
window.addEventListener('load', () => new App().run());

