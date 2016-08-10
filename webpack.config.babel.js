const webpack = require('webpack');
const {resolve} = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

  const css_ = [
    'css-loader?sourceMap',
    'postcss-loader'
  ].join('!');

  const sass_ = [
    'css-loader?sourceMap',
    'postcss-loader',
    'resolve-url-loader',
    'sass-loader?sourceMap&expanded'
  ].join('!');

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  return {
    debug: !env.prod,
    context: resolve(__dirname, 'src'),
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
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod
    },
    module: {
      preLoaders: [
        {
          test: /\.js[x]?$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ],
      loaders: [
        {
          test: /\.js[x]?$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: css_})
        },
        {
          test: /\.s(a|c)ss$/,
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: sass_})
        },
        // Images: inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.jpg/,
          loader: 'url-loader',
          query: {
            limit: 8192,
            mimetype: 'image/jpg',
            name: '/images/[name].[ext]'
          }
        },
        { test: /\.gif/, loader: 'url-loader?limit=8192&mimetype=image/gif&name=/images/[name].[ext]' },
        { test: /\.png/, loader: 'url-loader?limit=8192&mimetype=image/png&name=/images/[name].[ext]' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000&minetype=application/font-woff' },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?limit=100000' }
      ]
    },
    eslint: {
      failOnWarning: false,
      failOnError: true
    },
    /*
    // Note: Do not enable if you don't have any SASS files.
    // webpack-validator will fail with 'error: "sassLoader" is not allowed'
    sassLoader: {
      includePaths: [
        resolve(__dirname, './node_modules'),
        resolve(__dirname, './src')
      ]
    },
    */
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],
    resolve: {
      root: resolve('./src'),
      modulesDirectories: ['src', 'node_modules'],
      extensions: ['', '.js', '.jsx', '.css', '.scss', '.html']
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: './index.html'
      }),

      new ExtractTextPlugin( { filename: 'styles.css', disable: false, allChunks: true } ),

      new StyleLintPlugin({
        // http://stylelint.io/user-guide/example-config/
        configFile: '.stylelintrc',
        context: 'src',
        files: '**/*.s?(a|c)ss',
        syntax: 'scss',
        failOnError: false
      }),

      new CopyWebpackPlugin([
        { from: 'favicon.png' }
      ]),

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
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false
        }
      }))
      // End: finetuning 'npm run build:prod'
    ])
  };
};
