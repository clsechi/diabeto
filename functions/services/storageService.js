const admin = require('./firebaseAdmin');

const uploadFile = async (file, filename) => {
  const bucket = admin.storage().bucket();

  const options = {
    destination: 'userId',
  };

  await bucket.upload(filePath, options);

  console.log(`[Firebase] File ${filename} uploaded with success to path ${options.destination}`);
};

module.exports = {
  uploadFile,
};
