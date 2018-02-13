// Called when express.js app starts on given port w/o errors
import ip from 'ip';
import chalk from 'chalk';
import config from '../config';
import logger from './logger/logger';
import normalizeProxy from './utils/normalize-proxy-config';

// eslint-disable-next-line prefer-template
const toURL = (scheme, host, port = '') => `${scheme}://${host}${port ? ':' + port : ''}`;

const { isTest, isHot, server, useProxy } = config;

const infoServerStarted = () => {

  const {context, options} = useProxy && server.proxy ? normalizeProxy(server.proxy) : {};

  const divider = chalk.gray('-------------------------------------------------------------------\n');

  const info =
    // eslint-disable-next-line prefer-template
    `${isHot ? 'HMR ' : ''}Server started ${chalk.green('✓')}\n\n` +
    chalk.bold('Access URLs:\n') +
    divider +
    '        Host: ' + chalk.magenta(`${toURL(server.scheme, server.host, server.port)}${server.publicPath}\n`) +
    '         LAN: ' + chalk.magenta(`http://${ip.address()}:${server.port}${server.publicPath}\n`) +
    ` Public path: ${server.publicPath}\n` +
    `    Api path: ${server.apiPath}\n` +
    '       Proxy: ' + (useProxy ? chalk.magenta(`${context} to ${options.target}\n`) : 'false\n') +
    `Content base: ${server.contentBase}\n` +
    divider +
    (isTest ? '' : chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`));

  logger.info(info); // eslint-disable-line no-console
};

export default infoServerStarted;
