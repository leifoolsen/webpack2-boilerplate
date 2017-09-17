import {describe, it} from 'mocha';
import {assert} from 'chai';
import configBuilder from '../../../src/config/config-builder';

const cfg = {
  standard: {
    logger: {
      console: {
        level: 'debug'
      },
      remote: {
        level: 'error',
        batchSize: 1,
        url: '/api/log'
      }
    },
  },
  development: {},
  production: {
    logger: {
      console: {
        level: 'info'
      }
    }
  },
  test: {
    logger: {
      remote: {
        level: 'silent'
      }
    }
  }
};

const expectedDefaultConfig = {
  logger: {
    console: {
      level: 'debug'
    },
    remote: {
      level: 'error',
      batchSize: 1,
      url: '/api/log'
    }
  },
};

const expectedProductionConfig = {
  logger: {
    console: {
      level: 'info'
    },
    remote: {
      level: 'error',
      batchSize: 1,
      url: '/api/log'
    }
  },
};

const expectedTestConfig = {
  logger: {
    console: {
      level: 'debug'
    },
    remote: {
      level: 'silent',
      batchSize: 1,
      url: '/api/log'
    }
  },
};

describe('config-builder', () => {
  it('should create a config builder', () => {
    const builder = configBuilder();
    assert.isObject(builder);
    assert.isFunction(builder.build);
  });

  it('should create a default config', () => {
    const config = configBuilder(cfg.standard).build();
    assert.deepEqual(config, expectedDefaultConfig);
  });

  it('should create a development config', () => {
    const config = configBuilder(cfg.standard, cfg.developemnt).build();
    assert.deepEqual(config, expectedDefaultConfig);
  });

  it('should create a production config', () => {
    const config = configBuilder(cfg.standard, cfg.production).build();
    assert.deepEqual(config, expectedProductionConfig);
  });

  it('should create a test config', () => {
    const config = configBuilder(cfg.standard, cfg.test).build();
    assert.deepEqual(config, expectedTestConfig);
  });

  it('should create a config passing parameters to build', () => {
    const config = configBuilder().build(cfg.standard, cfg.test);
    assert.deepEqual(config, expectedTestConfig);
  });

  it('should create a config passing paramaters to both builder object and build method', () => {

    const expectedFooBarConfig = {
      foo: {
        bar: 1,
        baz: {
          label: 'baz',
        },
        buz: {
          label: 'buz'
        }
      },
    };

    const config = configBuilder({foo: {bar: 2}}, {foo: {bar: 1}})
      .build({foo: {baz: {label: 'baz'}}}, {foo: {buz: {label: 'buz'}}});

    assert.deepEqual(config, expectedFooBarConfig);
  });
});
