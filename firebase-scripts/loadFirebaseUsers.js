const { usersToLoad, usersPasswords } = require("./usersToLoad");
// const { db, auth } = require("./firebase");
const { admin } = require('./firebaseAdmin');

const main = async () => {
  try {
    admin.auth().importUsers(usersPasswords, {
      hash: {
        algorithm: 'BCRYPT'
      }
    })
      .then(function(results) {
        results.errors.forEach(function(indexedError) {
          console.log('results', results)
          console.log('Error importing user ' + indexedError.error);
        });
      })
      .catch(function(error) {
        console.log('Error importing users:', error);
      });
      // Load users with data
    // usersToLoad.map(async (userData, i) => {
      // await auth
      // .createUserWithEmailAndPassword(userData.email, userData.password)
      // .then((res) => {
      //   const user = res.user;
      //   db.collection("users").doc(user.uid).set(userData);
      //   console.log("integer", i);
      //   })
      //   .catch((error) => {
      //     console.log("error en catch", error);
      //   });
    // });
  } catch (e) {
    console.log("el error", e);
  } finally {
    console.log('Done!')
  }
};

main().catch(console.error);
