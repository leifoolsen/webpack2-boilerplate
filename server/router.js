// Sample REST API
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.type('json').json( { api: '/api', ping: '/api/ping' }));

router.get('/ping', (req, res) => res.type('json').json( {ping: 'pong!'}));

router.get('*', (req, res) => res.sendStatus(404).end());

export default router;
