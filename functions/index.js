const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');

const client = new firestore.v1.FirestoreAdminClient();

const bucket = 'gs://diabeto-7ba34.appspot.com';

exports.scheduledFirestoreExport = functions.pubsub
  .schedule('0 0 1 * *')
  .onRun(async () => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, '(default)');

    try {
      const [response] = await client.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: ['users']
      });

      console.log(`Operation Name: ${response['name']}`);
    } catch (error) {
      console.error(error);
      throw new Error('Export operation failed')
    }
  });