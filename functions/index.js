const functions = require('firebase-functions');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });

const getRecords = require('./controllers/getRecords');
const getUser = require('./controllers/getUser');
const validateToken = require('./helpers/validateToken');

const app = express();

// Automatically allow cross-origin requests
app.use(cors);
app.use(bodyParser.json());

// status route
app.get('/status', (req, res) => res.json({
  message: 'Hello! I am here.',
  version: process.env.npm_package_version, // TODO read from package.json
}));

// routes
app.get('/:userId/records', validateToken, getRecords);

app.get('/:userId', validateToken, getUser);

app.use((err, req, res) => {
  console.log(err); /* eslint-disable-line no-console */
  res.status(500).send('Something is broken');
});

exports.app = functions.https.onRequest(app);
