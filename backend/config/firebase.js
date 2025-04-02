const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-key.json"); // JSON file jo Firebase se milega

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com" // Firebase Project ID yahan daalo
});

const db = admin.firestore();
module.exports = db;
