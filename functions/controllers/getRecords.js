const moment = require('moment');
const db = require('../helpers/database');

const convertDate = ({ seconds }) => new Date(seconds * 1000);

const mapPeriod = (period) => {
  if (!period) return new Date('2000');
  return moment().subtract(period, 'days').toDate();
};

const mapRecords = snapshot => (
  snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = convertDate(data.createdAt);
    data.updatedAt = convertDate(data.updatedAt);
    data.time = convertDate(data.time);
    return data;
  })
);

const getRecords = async (req, res) => {
  try {
    const { userId } = req.params;

    let { period } = req.query;
    if (!period) period = 7;

    const snapshot = await db
      .collection('users')
      .doc(userId)
      .collection('records')
      .where('time', '>=', mapPeriod(period))
      .orderBy('time', 'desc')
      .get();

    const records = mapRecords(snapshot);

    res.status(200).json(records);
  } catch (err) {
    console.log('Error on getRecords', err); /* eslint-disable-line no-console */
    throw err;
  }
};

module.exports = getRecords;
