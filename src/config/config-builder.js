import deepMerge from '../../src/utils/deep-merge';

/**
 * Builds a configuration object by merging one or more objects
 * @param configs the objects used to build the resulting configuration object
 * @return {{}} the resulting configuration object
 *  * @example
 * // Given
 * const defaultConfig = {
 *   logger: {
 *     console: {
 *       level: 'debug'
 *     },
 *     remote: {
 *       level: 'error',
 *       batchSize: 1,
 *       url: '/api/log'
 *     }
 *   };
 * const testConfig = {
 *   logger: {
 *     remote: {
 *       level: 'silent',
 *     }
 *   };
 *
 * const c = configBuilder(defaultConfig, testConfig).build();
 * // Returns
 * {
 *   logger: {
 *     console: {
 *       level: 'debug'
 *     },
 *     remote: {
 *       level: 'silent',
 *       batchSize: 1,
 *       url: '/api/log'
 *     }
 *   };
 *
 */
const configBuilder = (...configs) => {
  return {
    build(...moreConfigs) {
      return deepMerge({}, ...configs, ...moreConfigs);
    }
  };
};

export default configBuilder;
