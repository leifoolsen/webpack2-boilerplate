'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';

const path = require('path');

const app = express();



const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const isProd = !isDev;
const ifDev = plugin => addPlugin(isDev, plugin);
const ifProd = plugin => addPlugin(isProd, plugin);
const addPlugin = (add, plugin) => add ? plugin : undefined;
const removeEmpty = array => array.filter(i => !!i);

if(isDev) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');

  const src = path.resolve(process.cwd(), 'src');
  const dist = path.resolve(process.cwd(), 'dist');
  const config = {
    context: src,
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map', // source map can be turned off in UglifyJsPlugin
    bail: isProd,
    cache: !isProd,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    resolve: {
      modules: [
        'node_modules',
        src,
      ],
      extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html']
    },
    entry: {
      app: [
        'webpack-hot-middleware/client',
        './stylesheets/main.scss',
        './index.js',
      ],
      vendor: [
        'moment'
        // +++ other 3'rd party
      ]
    },
    output: {
      filename: 'bundle.[name].[hash].js',
      path: dist,
      pathinfo: !isProd,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: [src],
          exclude: [/node_modules/],
        },
        {
          test: /\.js[x]?$/,
          include: [src],
          exclude: [/node_modules/],
          loader: 'babel',
        },
        {
          // No HMR
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css?sourceMap', 'postcss']
          })
        },
        {
          // No HMR
          // See: https://github.com/webpack/webpack/issues/2812
          test: /\.s?(a|c)ss$/,
          include: [
            src,
            path.resolve(__dirname, 'node_modules')
          ],
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              {
                loader: 'css', query: { sourceMap: true }
              },
              'postcss',
              'resolve-url',
              {
                loader: 'sass', query: { sourceMap: isProd ? 'compressed' : 'expanded' }
              }
            ]
          })
        },
        /*
        {
          // Enables HMR - but having trouble loading bacground images in SASS
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader', query: { sourceMap: true }
            },
            'postcss',
            'resolve-url',
          ]
        },
        {
          // Enables HMR - but having trouble loading bacground images in SASS
          test: /\.s?(a|c)ss$/,
          include: [
            src,
            path.resolve(__dirname, 'node_modules')
          ],
          use: [
            'style-loader',
            {
              loader: 'css-loader', query: { sourceMap: true }
            },
            'postcss',
            'resolve-url',
            {
              loader: 'sass', query: { sourceMap: isProd ? 'compressed' : 'expanded' }
            }
          ]
        },
        */
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.jpg$/,
          loader: 'url-loader?limit=8192&mimetype=image/jpg&name=/images/[name].[ext]'
        },
        {
          test: /\.gif$/,
          loader: 'url-loader?limit=8192&mimetype=image/gif&name=/images/[name].[ext]'
        },
        {
          test: /\.png$/,
          loader: 'url-loader?limit=8192&mimetype=image/png&name=/images/[name].[ext]'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ['url-loader?limit=100000&mimetype=application/font-woff']
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ['file-loader?limit=100000']
        },

      ]
    },
    plugins: removeEmpty([
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      // Module ids are full names
      // Outputs more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      // Hook into the compiler to extract progress information.
      //new webpack.ProgressPlugin(),

      new webpack.LoaderOptionsPlugin({
        // See: https://github.com/postcss/postcss-loader/issues/125
        // See: http://pastebin.com/Lmka3rju
        minimize: isProd,
        debug: !isProd,
        stats: {
          colors: true
        },
        options: {
          context: src,
          output: {
            path: dist,
          },
          postcss: [
            precss,
            autoprefixer({
              browsers: [
                'last 2 versions',
                'ie >= 11',
              ],
            }),
          ],
        },
        eslint: {
          failOnWarning: false,
          failOnError: true
        },
      }),

      // Order the modules and chunks by occurrence. This saves space,
      // because often referenced modules and chunks get smaller ids.
      new webpack.optimize.OccurrenceOrderPlugin(),

      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin(),

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        minify: isProd ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : {},
      }),

      new ExtractTextPlugin({
        filename: 'styles.[hash].css',
        disable: false,
        allChunks: true
      }),

      new StyleLintPlugin({
        // https://github.com/vieron/stylelint-webpack-plugin
        // http://stylelint.io/user-guide/example-config/
        configFile: '.stylelintrc',
        context: 'src',
        files: '**/*.s?(a|c)ss',
        syntax: 'scss',
        failOnError: false
      }),

      new CopyWebpackPlugin([
        { from: 'favicon.png' },
        { from: 'assets', to: 'assets' }
      ]),

      // Tell webpack we want Hot Module Reloading.
      // Note: Do not combine with --hot --inline from command line, you'll end up with 2x HMR
      ifDev(new webpack.HotModuleReplacementPlugin()),

      // Finetuning 'npm run build:prod'
      // Note: remove '-p' from "build:prod" in package.json
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),

      // Merge all duplicate modules
      ifProd(new webpack.optimize.DedupePlugin()),

      // saves a couple of kBs
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true
      })),

      ifProd(new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: true
      }))
      // End: finetuning 'npm run build:prod'

    ])

  };

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: true,
    stats: 'errors-only',
  }));
  app.use(webpackHotMiddleware(compiler));

} //~isDev


// Folder to to serve public files
//app.use('/', express.static(path.resolve(__dirname, 'public')));

// node.js middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// get the intended port number, use port 3001 if not provided
const port = process.env.PROXY_PORT || 3001;
const host = 'localhost';
const server = app.listen(port, host, (err) => {
  if(err) {
    logger.error(err.message);
  }
  else {
    logger.serverStarted(port);
  }
});


// Sample API
app.get('/api/ping', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json( {ping: 'pong!'} );
});
