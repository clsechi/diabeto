const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });

const createReport = require('./controllers/reports/createReport');
const authentication = require('./services/authenticationService');

const app = express();

app.use(cors);

app.use(bodyParser.json());

app.get('/status', (req, res) => res.sendStatus(200));

// TODO add authentication
app.post('/reports', createReport);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err); /* eslint-disable-line no-console */
  return res.status(500).send('Something is broken');
});


exports.app = functions.https.onRequest(app);
