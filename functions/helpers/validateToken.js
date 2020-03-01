const db = require('../helpers/database');

const validateToken = async (req, res, next) => {
  const { userId } = req.params;

  const { token } = req.headers;

  if (!token) {
    console.log('Token header not found');
    return res.status(401).send('Unauthorized');
  }

  const snapshot = await db
    .collection('users')
    .doc(userId)
    .collection('tokens')
    .where('value', '==', token)
    .get();

  console.log('TCL: validateToken -> snapshot.docs[0]', snapshot.docs[0]);
  if (!snapshot.docs.length) {
    console.log('Token value not found');
    return res.status(401).send('Unauthorized');
  }

  const { id: tokenId } = snapshot.docs[0];

  console.log(`User authenticated with tokenId ${tokenId} at ${new Date()}`);

  return next();
};

module.exports = validateToken;
