
var admin = require("firebase-admin");

// var serviceAccount = require("./feipays-firebase.json");
var serviceAccount = require("../heimdallr-nanosaves-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heimdallr-nanosaves.firebaseio.com"
  // databaseURL: "https://feipays.firebaseio.com"
});

module.exports = { admin };