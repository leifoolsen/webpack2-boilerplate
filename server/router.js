// Sample REST API
import express from 'express';
import logger from './logger';

const router = express.Router();

router.get('/', (req, res) => res.type('json').json( { api: '/api', ping: '/api/ping' }));

router.get('/ping', (req, res) => res.type('json').json( {ping: 'pong!'}));

router.post('/log', (req, res) => {
  // No logging framework used. Choose your own, e.g. Winston
  logger.info(JSON.stringify(req.body));
  res.status(200).send({ message: 'OK'});
});

router.get('*', (req, res) => res.sendStatus(404).end());

export default router;
