// Called when express.js app starts on given port w/o errors
import ip from 'ip';
import chalk from 'chalk';
import config from '../config';
import logger from './logger';

const { isTest, isHot, apiPath, server, proxy } = config;

const infoServerStarted = () => {

  const divider = chalk.gray('-------------------------------------------------------------------\n');

  const info =
    // eslint-disable-next-line prefer-template
    `${isHot ? 'HMR ' : ''}Server started ${chalk.green('✓')}\n\n` +
    chalk.bold('Access URLs:\n') +
    divider +
    '        Host: ' + chalk.magenta(`${server.url}${server.publicPath}\n`) +
    '         LAN: ' + chalk.magenta(`http://${ip.address()}:${server.port}${server.publicPath}\n`) +
    ` Public path: ${server.publicPath}\n` +
    `    Api path: ${apiPath}\n` +
    '       Proxy: ' + (proxy ? chalk.magenta(`${proxy.options.target}${proxy.context}\n`) : 'false\n') +
    `Content base: ${server.contentBase}\n` +
    divider +
    (isTest ? '' : chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`));

  logger.info(info); // eslint-disable-line no-console
};

export default infoServerStarted;
