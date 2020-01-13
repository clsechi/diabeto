process.env.TZ = 'America/Sao_Paulo' 

const admin = require('firebase-admin');
const CSV = require('csvtojson');
const moment = require('moment');

const serviceAccount = require('../diabeto-7ba34-firebase-adminsdk-vs7xd-011143e3ae.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diabeto-7ba34.firebaseio.com"
});

const db = admin.firestore();

const USER_ID = '';

const parseCSV = (path) => {
  return CSV().fromFile(path);
}

const mapDate = (date) => {
  const dateParsed = moment(date, 'DD/MM/YY HH:mm', true)
  if (!dateParsed.isValid()) {
    const error = new Error('Invalid Date')
    error.details = `date: ${date}`
    throw error;
  }
  return dateParsed.toDate();
};

const mapItem = (item) => {
  const data = {
    time: mapDate(item['Time Record']),
    createdAt: moment().toDate(),
    updatedAt: moment().toDate(),
    dextro: parseInt(item['Dextro'], 10),
    location: null,
    type: null,
    carbs: null,
    note: null,
    tags: [],
    images: [],
    insulin: {
      basal: {
        type: 'glargina',
        commonName: 'Lantus',
        value: null,
      },
      correction: {
        type: 'humalog',
        commonName: 'Lispro',
        value: null,
      },
      meal: {
        type: 'humalog',
        commonName: 'Lispro',
        value: null,
      },
    },
  };
  return data;
}

const uploadData = (items) => {
  return Promise.all(items.map(item => (
    db.collection('users').doc(USER_ID)
    .collection('records').add(item)
  )))
}

(async function init() {
  try {
    console.log('Working');

    const items = await parseCSV('./dados.csv');
    const mapedItems = items.map(item => mapItem(item));
    const data = await uploadData(mapedItems);
    
    data.forEach(item => console.log(item.id))

    console.log('Done! :)');
    process.exit(0);
  } catch (err) {
    console.error('Error on init', err);
    process.exit(1);
  }
}());