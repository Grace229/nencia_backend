const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../nencia-30a82-firebase-adminsdk-qdvrd-23ac8759c4');

const config = initializeApp({
  credential: cert(serviceAccount)
});
// const docRef = db.collection('users').doc('alovelace');

// await docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

 const db = getFirestore(config);

exports.config
module.exports = db;