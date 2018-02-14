import {before, after, describe, it} from 'mocha';
import {assert} from 'chai';
const importFresh = require('import-fresh');

const runAsserts = (env, config) => {
  assert.equal(config.env, env);
  assert.isDefined(config.publicPath);
  assert.isDefined(config.apiPath);
  assert.isDefined(config.logger);
  assert.isDefined(config.logger.console);
  assert.isDefined(config.logger.console.level);
  assert.isDefined(config.logger.remote);
  assert.isDefined(config.logger.remote.level);
};

describe('config', () => {
  let env;
  let publicPath;
  let apiPath;

  before(() => {
    env = process.env.NODE_ENV;
    publicPath = process.env.PUBLIC_PATH;
    apiPath = process.env.API_PATH;

    process.env.PUBLIC_PATH = '/';
    process.env.API_PATH = '/api';
  });

  after(() => {
    process.env.NODE_ENV = env;
    process.env.PUBLIC_PATH = publicPath;
    process.env.API_PATH = apiPath;
  });

  it('should have config test', (done) => {
    process.env.NODE_ENV = 'test';
    const c = importFresh('../../../src/config/config').default;
    runAsserts('test', c);
    done();
  });

  it('should have config development', (done) => {
    process.env.NODE_ENV = 'development';
    const c = importFresh('../../../src/config/config').default;
    runAsserts('development', c);
    done();
  });

  it('should have config production', (done) => {
    process.env.NODE_ENV = 'production';
    const c = importFresh('../../../src/config/config').default;
    runAsserts('production', c);
    done();
  });
});
