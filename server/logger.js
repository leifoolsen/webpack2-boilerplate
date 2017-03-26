// Copy from: https://github.com/mxstbr/react-boilerplate
// Copyright (c) 2016 Maximilian Stoiber. For more information see LICENSE.md.


/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n---------------------------------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
export default {

  log: (...msg) => {
    console.log(chalk.white(...msg));
  },

  info: (...msg) => {
    console.info(chalk.green(...msg));
  },

  // Called whenever there's an error on the server we want to print
  error: (...err) => {
    console.error(chalk.red(...err));
  },

  // Called when express.js app starts on given port w/o errors
  serverStarted: (port, proxyPort = null, publicPath = '/', isHot = false) => {
    console.log(`${isHot ? 'HMR ' : ''}Server started ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}${publicPath}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}${publicPath}`) +
    (proxyPort ? `\n    Proxy: ${chalk.magenta(`http://localhost:${proxyPort}${publicPath}`)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },

};

