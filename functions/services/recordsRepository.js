const db = require('./dbService');

const convertDate = ({ seconds }) => new Date(seconds * 1000);

const getRecordsByPeriod = async (userId, period) => {
  const snapshot = await db
    .collection('users').doc(userId)
    .collection('records')
    .where('time', '>=', new Date(period.start))
    .where('time', '<=', new Date(period.end))
    .orderBy('time', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = convertDate(data.createdAt);
    data.updatedAt = convertDate(data.updatedAt);
    data.time = convertDate(data.time);
    return data;
  });
};

module.exports = {
  getRecordsByPeriod,
};
