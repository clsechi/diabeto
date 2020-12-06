const admin = require('firebase-admin');

// admin.initializeApp();

const serviceAccount = require('../diabeto-7ba34-firebase-adminsdk-vs7xd-011143e3ae.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: 'AIzaSyD1r1fFj1QGFcfu0jahdNr8vp5sZywHZIk',
  authDomain: 'diabeto-7ba34.firebaseapp.com',
  databaseURL: 'https://diabeto-7ba34.firebaseio.com',
  projectId: 'diabeto-7ba34',
  storageBucket: 'diabeto-7ba34.appspot.com',
  messagingSenderId: '522468881380',
  appId: '1:522468881380:web:e667be4e114187c41f4df1',
});

module.exports = admin;
