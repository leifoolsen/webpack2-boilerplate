/**
 * webpack config to hot reload server side code
 *
 * @see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0
 * @see https://hackernoon.com/creating-a-structured-hot-reloadable-graphql-api-with-express-js-de62c859643
 * @see https://github.com/ericclemmons/webpack-hot-server-example
 */

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  devtool: 'inline-sourcemap',
  name: 'server',
  watch: true,
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({whitelist: ['webpack/hot/poll?1000']})],
  entry: {
    'api-server': [
      'webpack/hot/poll?1000',
      './server/api-server.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', {modules: false}]],
              plugins: ['transform-regenerator', 'transform-runtime']
            }
          }
        ],
        exclude: /node_modules/
      },
    ],
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    pathinfo: true,
  },
  plugins: [
    new StartServerPlugin('api-server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_TARGET': JSON.stringify('server'),
    }),
  ],
};
