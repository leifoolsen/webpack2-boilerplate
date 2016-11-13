'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';

const app = express();

// Folder to to serve public files
// We're only using this server as a rest server - so not needed
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
