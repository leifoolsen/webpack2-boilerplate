// OPTIMIZING WEBPACK FOR FASTER BUILDS
// ------------------------------------------
// See: http://engineering.invisionapp.com/post/optimizing-webpack/
// See: https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7
// See: https://robertknight.github.io/posts/webpack-dll-plugins/
// See: http://odetocode.com/blogs/scott/archive/2016/12/01/building-vendor-and-feature-bundles-with-webpack.aspx
// See: https://engineering.bitnami.com/articles/optimizing-your-webpack-builds.html


const webpack = require('webpack');
const path = require('path');
const dist = path.resolve(process.cwd(), 'dist');

module.exports = {
  name: 'vendor',
  context: process.cwd(),
  devtool: '#source-map',
  target: 'web', // Make web variables accessible to webpack, e.g. window
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
  },
  entry: {
    vendor: [
      './src/vendor.js'
    ],
  },
  output: {
    path: dist,
    filename: '[name].dll.js',

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.join(dist, '[name].dll.manifest.json'),

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_[hash]',
    }),
  ],
  performance: {
    hints: false
  },
};
