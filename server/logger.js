// Copy from: https://github.com/mxstbr/react-boilerplate
// Copyright (c) 2016 Maximilian Stoiber. For more information see LICENSE.md.


/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
export default {

  log: (...msg) => {
    console.log(msg);
  },

  info: (...msg) => {
    console.info(chalk.green(msg));
  },

  // Called whenever there's an error on the server we want to print
  error: (...err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  serverStarted: (port, tunnelStarted=false) => {
    console.log(`Server started ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
    (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

