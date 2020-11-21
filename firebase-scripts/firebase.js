var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBoGNI8f3qA5LjiP8H0yeP9FdInzA9aBbA",
  authDomain: "feipays.firebaseapp.com",
  databaseURL: "https://feipays.firebaseio.com",
  projectId: "feipays",
  storageBucket: "feipays.appspot.com",
  messagingSenderId: "40389612443",
  appId: "1:40389612443:web:af9b7864257e7ac3a9073e",
  measurementId: "G-YK32WE4PBF",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const auth = firebase.auth();

module.exports = { auth, db, googleAuthProvider, facebookAuthProvider };
