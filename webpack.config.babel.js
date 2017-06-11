process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require("babel-register");

import argsToKeyValue from './server/args-to-key-value';
import configBuilder from './src/config/config-builder';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const precss = require('precss'); // eslint-disable-line no-unused-vars
const autoprefixer = require('autoprefixer'); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const UnCSSPlugin = require('uncss-webpack-plugin');

const argv = argsToKeyValue(process.argv.slice(2));
const config = configBuilder(process.env.NODE_ENV);

const isTest = process.env.NODE_ENV === 'test' || argv['env.test'] || false;
const isDev = !(process.env.NODE_ENV === 'production' || argv['env.prod']);
const isProd = !isDev;
const isHot = argv.hot || false;

const host = process.env.HOST || argv.host || config.server.host || 'localhost';
const port = process.env.PORT || argv.port || config.server.port || 3000;
const publicPath = process.env.PUBLIC_PATH || argv['public-path'] || config.server.publicPath || '/';
const apiPath = process.env.API_PATH || argv['api-path'] || config.server.apiPath || '/api';

const src = path.resolve(process.cwd(), 'src');
const dist = path.resolve(process.cwd(), 'dist');
const context = src;

// NOTE: Comment out "console.log" before executing "npm run analyze"
//eslint-disable-next-line no-console
console.log('Webpack config:', 'NODE_ENV:', process.env.NODE_ENV,
  'test:', isTest, 'prod:', isProd, 'dev:', isDev,
  'hot:', isHot, 'public path:', publicPath, 'API path:', apiPath);

//const removeEmpty = array => array.filter(i => !!i);

const removeEmptyKeys = obj => {
  const result = {};
  for (const key in obj) {
    if (!(obj[key] === null || obj[key].length === 0)) {
      result[key] = obj[key];
    }
  }
  return result;
};

const devPlugins = () => {

  if(isDev) {
    const manifest = path.resolve(dist, 'vendor.json');
    const indexHTML = path.resolve(src, 'index.html');

    if (!fs.existsSync(manifest)) {
      console.error(chalk.red(`The DLL manifest "${manifest}" is missing.`));
      console.error(chalk.red('Please run'), chalk.green('`npm run build:dll`'));
      process.exit(0);
    }

    if (!fs.existsSync(indexHTML)) {
      console.error(chalk.red(`"${indexHTML}" is missing.`));
      process.exit(0);
    }

    const templateContent = () => {
      // Append 'vendor.dll.js' to template
      // TODO: Start using jsdom-10.x.x new api
      const jsdom = require("jsdom/lib/old-api.js");
      const document = jsdom.jsdom(fs.readFileSync(indexHTML, 'utf8').toString());
      document.body.insertAdjacentHTML('beforeend', `<script type="text/javascript" src="${publicPath}vendor.dll.js"></script>`);
      return jsdom.serializeDocument(document);
    };

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifest)
      }),

      new HtmlWebpackPlugin({
        templateContent: templateContent(),
        inject: true,
        favicon: 'favicon.png',
        chunksSortMode: 'none',
        xhtml: true,
      }),
    ];
  }
  return [];
};

const hotPlugins = isHot
  ? [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true, // Enable multi-pass compilation for enhanced performance in larger projects.
      }),
    ]
  : [];

const prodPlugins = isProd
  ? [
      // Note: do not use '-p' in "build:prod" script

      // CommonsChunk analyzes everything in your bundles, extracts common bits into files together.
      // See: https://webpack.js.org/plugins/commons-chunk-plugin/
      // See: https://webpack.js.org/guides/code-splitting-libraries/
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        favicon: 'favicon.png',
        // Correct bundle order: [manifest, vendor, app]
        // see: http://stackoverflow.com/questions/36796319/webpack-with-commonschunkplugin-results-with-wrong-bundle-order-in-html-file
        // see: https://github.com/ampedandwired/html-webpack-plugin/issues/481
        chunksSortMode: 'dependency',
        xhtml: true,
        minify: {
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
        },
      }),

      // Merge all duplicate modules
      // No longer needed; default in webpack2
      //new webpack.optimize.DedupePlugin(),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,    // Enables tree shaking
          dead_code: true, // Enables tree shaking
          pure_getters: true,
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          comparisons: true,
          sequences: true,
          evaluate: true,
          join_vars: true,
          if_return: true,
        },
        output: {
          comments: false
        },
        sourceMap: true
      }),

      // Remove unused CSS, see: https://github.com/vseventer/uncss-webpack-plugin
      //new UnCSSPlugin({ /* options */ }),
    ]
  : [];

// See: https://github.com/rstacruz/webpack-tricks/blob/master/recipes/css.md
// See: https://github.com/rstacruz/webpack-starter-kit
const cssRules = isHot
  ? [
      {
        // Enables HMR. Inlines CSS in html head style tag
        test: /\.css|\.scss$/,
        include: [
          src,
          path.resolve(process.cwd(), 'node_modules')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',

            // Uncomment options if you don't want inlines CSS (HMR works for both)
            /*
            options: {
              url: true,
              sourceMap: true,
              importLoaders: 1
            }
            */
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: 'expanded'
            }
          },
        ]
      }
    ]
  : [
      {
        test: /\.css|\.scss$/,
        include: [
          src,
          path.resolve(process.cwd(), 'node_modules')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: isDev
                ? {
                    url: true,
                    sourceMap: true,
                    importLoaders: 1
                  }
                : {
                    url: true
                  }
            },
            {
              loader: 'postcss-loader',
              options: isDev
                ? { sourceMap: 'inline' }
                : {}
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              query: {
                sourceMap: isProd ? 'compressed' : 'expanded'
              }
            },
          ]
        })
      },
    ];

module.exports = {
  context: context,

  // Developer tool to enhance debugging
  // see: https://webpack.js.org/configuration/devtool/#devtool
  // see: https://github.com/rstacruz/webpack-tricks#source-maps-webpack-2
  // Redux and eval, see: https://twitter.com/dan_abramov/status/706294608603553793
  //                    : use devtool: eval for React HMR
  devtool: isProd ? 'hidden-source-map' : 'source-map',

  // See: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  stats: {
    colors: true,
    children: false,
    chunks: false,
    assetsSort: 'name',
  },
  cache:   !isProd,
  bail:    isProd,  // Don't attempt to continue if there are any errors.
  target:  'web',   // Make web variables accessible to webpack, e.g. window. This is a default value; just be aware of it
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html']
  },
  entry: removeEmptyKeys({
    // Correct bundle order: [manifest, vendor, app]
    // see: http://stackoverflow.com/questions/36796319/webpack-with-commonschunkplugin-results-with-wrong-bundle-order-in-html-file
    // see: https://github.com/ampedandwired/html-webpack-plugin/issues/481
    vendor: isProd ? ['./vendor.js'] : [],
    app: (isHot
      ? [
          // Dynamically set the webpack public path at runtime below
          // Must be first entry to properly set public path
          // See: http://webpack.github.io/docs/configuration.html#output-publicpath
          // NOTE: Not shure if this is really needed. Seems to work OK without
          //'./webpack-public-path.js',

          'webpack-hot-middleware/client',

          // reload - Set to true to auto-reload the page when webpack gets stuck.
          //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',

          // You can use full urls, like:
          //`webpack-hot-middleware/client?http://${host}:${port}${publicPath}`
          // Remember to update path in ./server/index.js - see: Step 3 in ./server/index.js
        ]
      : [])
      .concat([
        './index.js',
        './styles.scss',
      ]),
  }),
  output: {
    filename: isProd ? '[name].[chunkhash].js' : '[name].js', // Don't use hashes in dev mode
    chunkFilename: isProd ? '[name].[chunkhash].chunk.js' : '[name].chunk.js',
    path: dist,
    publicPath: publicPath,
    pathinfo: !isProd,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  performance: {
    hints: isProd ? 'warning' : false,
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
        loader: 'babel-loader',
      },
      {
        // Enables HMR. Extra step is needed in './src/index.js'
        test: /\.html$/,
        loader: 'html-loader', // loader: 'html', // loader: 'raw' // html vs raw: what's the difference??
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/jpg'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/gif'
      },
      {
        test: /\.png$/,
        use: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/png'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/svg+xml'
      },
      {
        test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?name=[name].[ext]&limit=100000&mimetype=application/font-woff']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?name=[name].[ext]&limit=100000&mimetype=application/font-woff2']
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader?name=[name].[ext]&limit=100000&mimetype=application/octet-stream']
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?name=[name].[ext]&limit=10000&mimetype=font/opentype'
      },
    ].concat(cssRules)
  },
  plugins: [
    // Expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      'process.env.API_PATH': JSON.stringify(apiPath),
      __DEV__: !isProd
    }),

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
      },
      eslint: {
        failOnWarning: false,
        failOnError: true
      },
    }),

    // Avoid publishing files when compilation fails
    // Note: NoErrorsPlugin is renamed to NoEmitOnErrorsPlugin
    new webpack.NoEmitOnErrorsPlugin(),

    // No longer needed in Webpack2, on by default
    //new webpack.optimize.OccurrenceOrderPlugin(),

    // Generate an external css file with a hash in the filename
    // allChunks: true -> preserve source maps
    new ExtractTextPlugin({
      filename: isProd ? '[name].[chunkhash].styles.css' : '[name].styles.css',
      disable: false,
      allChunks: true,
    }),

    new StyleLintPlugin({
      // https://github.com/vieron/stylelint-webpack-plugin
      // http://stylelint.io/user-guide/example-config/
      configFile: '.stylelintrc',
      context: src,
      files: '**/*.s?(a|c)ss',
      syntax: 'scss',
      failOnError: false
    }),

    new CopyWebpackPlugin([
      //{ from: 'favicon.png' },
      { from: 'assets', to: 'assets' }
    ]),

    // Module ids are full names
    // Outputs more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

  ].concat(devPlugins()).concat(hotPlugins).concat(prodPlugins),

  // Config options:
  // see: https://webpack.github.io/docs/webpack-dev-server.html
  // see: https://webpack.js.org/configuration/dev-server/
  // see: https://github.com/webpack/webpack-dev-middleware
  // see: https://github.com/chimurai/http-proxy-middleware
  // see: https://github.com/bripkens/connect-history-api-fallback
  // NOTE: Only use options that are compatible with webpack-dev-middleware
  devServer: {
    host: host,
    port: port,
    publicPath: publicPath,
    contentBase: context,
    hot: isHot,
    compress: true,
    open: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    headers: {'Access-Control-Allow-Origin': '*'},
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    historyApiFallback: {
      verbose: isHot,
      disableDotRule: false,
    },
  }
};
