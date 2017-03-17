common = '--strict --require features --format pretty --tags ~@skip';

module.exports = {
  build: common + ' --format progress',
  'default': common,
  'es5': '--tags ~@es6'
};
