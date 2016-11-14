const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

  const argv = require('./server/array-to-key-value').arrayToKeyValue(process.argv.slice(2));
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifDev = plugin => addPlugin(env.dev, plugin);
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  const src = path.resolve(__dirname, 'src');
  const dist = path.resolve(__dirname, 'dist');

  // get the intended port number, use port 3000 if not provided
  const port = Number(argv.port || process.env.PORT || '3000');

  // API server
  // I was not able to "inject" Express middleware into webpack2. The following error occurs:
  // "Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema"
  // For now, the API server i started in "start:server" script, then a proxy is configured in "devServer"
  const proxyPort = process.env.PROXY_PORT || false;

  return {
    context: src,
    devtool: env.prod ? 'source-map' : 'eval-cheap-module-source-map', // source map can be turned off in UglifyJsPlugin
    bail: env.prod,
    cache: !env.prod,
    resolve: {
      modules: [
        'node_modules',
        src,
      ],
      extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html']
    },
    entry: {
      app: [
        './stylesheets/main.scss',
        './index.js'
      ],
      vendor: [
        'moment'
        // +++ other 3'rd party
      ]
    },
    output: {
      filename: 'bundle.[name].[hash].js',
      path: dist,
      pathinfo: !env.prod,
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
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css?sourceMap', 'postcss']
          })
        },
        {
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
                loader: 'sass', query: { sourceMap: env.prod ? 'compressed' : 'expanded' }
              }
            ]
          })
        },
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
      ],
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
        minimize: env.prod,
        debug: !env.prod,
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

      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin(),

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        minify: env.prod ? {
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

      // Tell webpack we want Hot Module Reloading.
      // Note: Do not combine with --hot --inline from command line, you'll end up with 2x HMR
      ifDev(new webpack.HotModuleReplacementPlugin()),

      new CopyWebpackPlugin([
        { from: 'favicon.png' },
        { from: 'assets', to: 'assets' }
      ]),

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
    ]),

    devServer: {
      port: port,
      hot: true,
      inline: true,
      historyApiFallback: true,
      progress: true,
      stats: {
        colors: true,
        chunkModules: false,
        assets: false
      },
      proxy: proxyPort ? {
        // Our api server
        '/api/*': {
          target: `http://localhost:${proxyPort}`,
          secure: false
        }
      } : {}
    },

  };
};
