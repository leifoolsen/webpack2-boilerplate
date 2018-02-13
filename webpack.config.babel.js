process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import config from './config';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { isHot, isDev, isProd } = config;
const { publicPath, apiPath } = config.server;
const src = path.resolve(process.cwd(), 'src');
const dist = path.resolve(process.cwd(), 'dist');
const dll = dist; //path.join(dist, 'dll');
const node_modules = path.resolve(process.cwd(), 'node_modules');
const cssModules = true;

// NOTE: Comment out "console.log" before executing "npm run analyze"
//eslint-disable-next-line no-console
console.log('webpack:',
  `NODE_ENV: "${process.env.NODE_ENV}",`,
  `isProd: ${config.isProd},`,
  `isDev: ${config.isDev},`,
  `isTest: ${config.isTest},`,
  `isHot: ${config.isHot},`,
  `loglevel: "${config.logger.console.level}",`,
  `public: "${publicPath}",`,
  `api: "${apiPath}"`);


const removeEmptyKeys = obj => {
  const result = {};
  for (const key in obj) {
    if (!(obj[key] === null || obj[key].length === 0)) {
      result[key] = obj[key];
    }
  }
  return result;
};

const plugins = () => {

  const result = [
    // Expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      'process.env.API_PATH': JSON.stringify(apiPath),
      __DEV__: isDev,
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnError: isProd
        },
        context: src, // Required for the sourceMap of css/sass loader
        debug: isDev,
        minimize: isProd,
      },
    }),

    // Enable scope hoisting
    // See: https://webpack.js.org/plugins/module-concatenation-plugin/
    // See: https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
    new webpack.optimize.ModuleConcatenationPlugin(),

    new ExtractTextPlugin({
      filename: isProd ? '[name].[chunkhash].styles.css' : '[name].styles.css',
      allChunks: true,
      disable: isHot, // Disable css extracting on development
      ignoreOrder: false,
    }),

    new StyleLintPlugin({
      // https://github.com/vieron/stylelint-webpack-plugin
      // http://stylelint.io/user-guide/example-config/
      configFile: path.resolve(process.cwd(), '.stylelintrc'),
      files: '**/*.s?(a|c)ss',
      syntax: 'scss',
      failOnError: isProd
    }),

    new StyleLintPlugin({
      // https://web-design-weekly.com/2016/06/15/integrate-stylelint-workflow-better-css/
      configFile: path.resolve(process.cwd(), '.stylelintrc'),
      files: '**/*.css',
      failOnError: isProd
    }),

    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ]),
  ];

  if (isDev) {
    const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
    const dllManifest = path.join(dll, 'vendor.dll.manifest.json');
    const indexHTML = path.join(src, 'index.html');

    if (!fs.existsSync(dllManifest)) {
      console.error(chalk.red(`The DLL manifest "${dllManifest}" is missing.`));
      console.error(chalk.red('Please run'), chalk.green('`npm run build:dll`'));
      process.exit(0);
    }

    if (!fs.existsSync(indexHTML)) {
      console.error(chalk.red(`"${indexHTML}" is missing.`));
      process.exit(0);
    }

    result.push(
      new webpack.DllReferencePlugin({
        context: dll,
        manifest: require(dllManifest)
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      new HtmlWebpackPlugin({
        template: './index.html',
        xhtml: true,
        inject: true,
        favicon: 'favicon.png',
      }),

      new AddAssetHtmlPlugin([
        {
          filepath: path.resolve(dll, 'vendor.styles.css'),
          publicPath: publicPath, //path.join(publicPath, 'dll'),
          typeOfAsset: 'css'
        },
        {
          filepath: path.resolve(dll, 'vendor.dll.js'),
          publicPath: publicPath, //path.join(publicPath, 'dll')
        },
      ]),
    );
  }

  if (isHot) {
    result.push(
      new webpack.HotModuleReplacementPlugin(
        //{
        //multiStep: false, // true: Enable multi-pass compilation for enhanced performance in larger projects.
        //                  // NOTE: multiStep: true does not work with webpack3, fails with error:
        //                  //       "Server Uncaught Exception  TypeError: Cannot read property 'source' of undefined"
        //                  // NOTE: options are experimental and may be deprecated. They are typically not necessary and
        //                  //       including a new webpack.HotModuleReplacementPlugin() is enough.
        //                  //       See: https://webpack.js.org/plugins/hot-module-replacement-plugin/
        //}
      ),

      // Prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
    );
  }

  if (isProd) {
    // Note: do not use '-p' in "build:prod" script

    result.push(
      // CommonsChunk analyzes everything in your bundles, extracts common bits into files together.
      // See: https://webpack.js.org/plugins/commons-chunk-plugin/
      // See: https://webpack.js.org/guides/code-splitting-libraries/
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
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

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        xhtml: true,
        inject: true,
        favicon: 'favicon.png',
        // Correct bundle order: [manifest, vendor, app]
        // see: http://stackoverflow.com/questions/36796319/webpack-with-commonschunkplugin-results-with-wrong-bundle-order-in-html-file
        // see: https://github.com/ampedandwired/html-webpack-plugin/issues/481
        chunksSortMode: 'dependency',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),

    );
  }

  return result;
};


module.exports = {
  name: 'client',
  target: 'web', // Make web variables accessible to webpack, e.g. window. This is a default value; just be aware of it
  bail: isProd,  // Don't attempt to continue if there are any errors.
  context: src,
  cache: isDev,
  devtool: isProd ? 'hidden-source-map' : 'inline-source-map',  // or 'cheap-module-eval-source-map'
  resolve: {
    modules: [
      src,
      'node_modules'
    ],
    extensions: [
      '.js',
      '.sass',
      '.scss',
      '.css',
      '.html'
    ]
  },
  entry: removeEmptyKeys({
    vendor: isProd ? ['./vendor.js'] : [],
    app: (isHot
      ? [
        // set reload=true to auto-reload the page when webpack gets stuck.
        'webpack-hot-middleware/client?reload=true',

        //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        // You can use full urls, like:
        //`webpack-hot-middleware/client?http://${host}:${port}${publicPath}`
        // Remember to update path in ./server/index.js - see: Step 3 in ./server/app.js
      ]
      : [])
      .concat([
        './index.js',
      ]),
  }),
  output: {
    filename: isProd ? '[name].[chunkhash].js' : '[name].js', // Don't use hashes in dev mode
    chunkFilename: isProd ? '[name].[chunkhash].chunk.js' : '[name].chunk.js',
    path: dist,
    publicPath: publicPath,
    pathinfo: isDev,
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [src],
        exclude: [/node_modules/],
      },
      {
        test: /\.js?$/,
        include: [src],
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev,
          presets: [
            [
              'env',
              {
                modules: false,
                'debug': false,
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        include: [
          src,
          node_modules
        ],
        exclude: [
          path.resolve(process.cwd(), 'src/global.css'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                importLoaders: 1,  // See: https://github.com/webpack-contrib/css-loader#importloaders
                modules: cssModules,
                localIdentName: '[name]__[local].[hash:base64:5]', //isDev ? '[name]__[local].[hash:base64:5]' : '[hash:base64:5]',
                minimize: isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true, // You can set the sourceMap: 'inline' option to inline
                                 // the source map within the CSS directly as an annotation comment.
              }
            },
            //{
            //  loader: 'resolve-url-loader' // Yields warnings in combination with postcss-cssnext and nested CSS classes
            //},
          ]
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'src/global.css'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                importLoaders: 1,
                modules: false,
                minimize: isProd,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'resolve-url-loader'
            },
          ]
        })
      },
      {
        test: /\.(scss|sass)$/,
        include: [
          src,
          node_modules
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                importLoaders: 2,
                modules: cssModules,
                localIdentName: '[name]__[local].[hash:base64:5]', //isDev ? '[name]__[local].[hash:base64:5]' : '[hash:base64:5]',
                minimize: isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true, // You can set the sourceMap: 'inline' option to inline
                                 // the source map within the CSS directly as an annotation comment.
              }
            },
            //{
            //  loader: 'resolve-url-loader'
            //},
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: isProd,
              }
            },
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?name=[name].[ext]&limit=10240&mimetype=image/svg+xml'
      },
      {
        test: /\.woff[2]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?name=[name].[ext]&limit=10240&mimetype=application/font-[ext]']
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader?name=[name].[ext]&limit=10240&mimetype=application/octet-stream']
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?name=[name].[ext]&limit=10240&mimetype=font/opentype'
      },
    ]
  },
};
