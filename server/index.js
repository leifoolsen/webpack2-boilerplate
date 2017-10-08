// Use babel-register to transpile server code on the fly
require('babel-register');

// Start the server
module.exports = require('./server.js').default.start();

