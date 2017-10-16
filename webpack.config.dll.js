// ------------------------------------------
// OPTIMIZING WEBPACK FOR FASTER BUILDS
// ------------------------------------------
// See: https://brunolm.wordpress.com/2017/03/24/webpack-dllplugin-and-dllreferenceplugin/
// See: http://engineering.invisionapp.com/post/optimizing-webpack/
// See: https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7
// See: https://robertknight.github.io/posts/webpack-dll-plugins/
// See: http://odetocode.com/blogs/scott/archive/2016/12/01/building-vendor-and-feature-bundles-with-webpack.aspx
// See: https://engineering.bitnami.com/articles/optimizing-your-webpack-builds.html

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = path.resolve(process.cwd(), 'src');
const dll = path.resolve(process.cwd(), 'dist');

module.exports = {
  name: 'vendor',
  context: process.cwd(),
  devtool: '#source-map',
  target: 'web', // Make web variables accessible to webpack, e.g. window
  resolve: {
    modules: [
      src,
      'node_modules',
    ],
  },
  entry: {
    vendor: [
      './src/vendor.js'
    ],
  },
  output: {
    path: dll,
    filename: '[name].dll.js',

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.join(dll, '[name].dll.manifest.json'),

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_[hash]',
    }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
      disable: false,
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          src,
          path.resolve(process.cwd(), 'node_modules')
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
                modules: false,
                minimize: false,
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
          path.resolve(process.cwd(), 'node_modules')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                importLoaders: 3,
                modules: false,
                minimize: false
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
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
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
    ],
  },
  performance: {
    hints: false
  },
};
