
const db = require('../helpers/database');

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection('users')
      .doc(userId);

    if (!snapshot.docs.length) {
      console.log(`User ${userId} Not Found`);
      return res.status(404).send('NotFound');
    }

    const { data } = snapshot.docs[0];

    return res.send(200).send(data);
  } catch (err) {
    console.log('Error on getUser', err);
    throw err;
  }
};

module.exports = getUser;
