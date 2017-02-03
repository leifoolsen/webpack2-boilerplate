// Se: http://beletsky.net/2015/01/configuring-front-end-applications.html

const env = process.env.NODE_ENV || 'development';

const config = {
  test: require('./development.config'), // eslint-disable-line global-require
  development: require('./development.config'), // eslint-disable-line global-require
  production: require('./production.config'), // eslint-disable-line global-require
};

module.exports = config[env];