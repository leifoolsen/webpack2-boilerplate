const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = env => {

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifDashboard = plugin => addPlugin(env.dashboard, plugin);
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  const srcPath = path.resolve(__dirname, 'src');
  const distPath = path.resolve(__dirname, 'dist');

  return {
    context: srcPath,
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    bail: env.prod,
    entry: {
      app: './index.js',
      vendor: [
        'moment'
        // +++ other 3'rd party
      ]
    },
    output: {
      filename: 'bundle.[name].[hash].js',
      path: distPath,
      pathinfo: !env.prod,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: [srcPath],
          exclude: [/node_modules/],
        },
        {
          test: /\.js[x]?$/,
          include: [srcPath],
          exclude: [/node_modules/],
          loader: 'babel',
        },
        {
          // See: https://github.com/webpack/webpack/issues/2812
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css?sourceMap', 'postcss']
          })
        },
        {
          // See: https://github.com/webpack/webpack/issues/2812
          test: /\.s?(a|c)ss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap&expanded']
          })
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
    resolve: {
      modules: [
        'node_modules',
        srcPath,
      ],
      extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.html']
    },
    plugins: removeEmpty([
      new webpack.LoaderOptionsPlugin({
        minimize: env.prod,
        debug: !env.prod,
        context: __dirname,
        eslint: {
          failOnWarning: false,
          failOnError: true
        },
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, './node_modules'),
            srcPath
          ]
        },
      }),

      new webpack.LoaderOptionsPlugin({
        // See: https://github.com/postcss/postcss-loader/issues/125
        // See: http://pastebin.com/Lmka3rju

        test: /\.s?(a|c)ss$/,
        debug: !env.prod,
        options: {
          postcss: [
            precss(),
            autoprefixer({
              browsers: [
                'last 2 versions',
                'ie >= 11',
              ],
            }),
          ],
          context: srcPath,
          output: {
            path: distPath,
          },
        },
      }),

      new HtmlWebpackPlugin({
        template: './index.html'
      }),

      new ExtractTextPlugin({
        filename: 'styles.css',
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

      ifDashboard(new DashboardPlugin()),

      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),

      // Finetuning 'npm run build:prod'
      // Note: remove '-p' from "build:prod" in package.json
      // doesn't save anything in this small app. npm@3 mostly takes care of this
      ifProd(new webpack.optimize.DedupePlugin()),

      // saves a couple of kBs
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true
      })),

      // saves 65 kB with Uglify!! Saves 38 kB without
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })),

      // saves 711 kB!!
      //ifProd(new webpack.optimize.UglifyJsPlugin({
      //  compress: {
      //    screw_ie8: true, // eslint-disable-line
      //    warnings: false
      //  }
      //}))
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      }))
      // End: finetuning 'npm run build:prod'
    ])
  };
};
