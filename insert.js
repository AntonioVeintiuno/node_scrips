//this script insert a row on a table named items
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/sample.db');

// insert one row into the items table
db.run(`INSERT INTO items(name) VALUES(?)`, ['Nodejs'], function(err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// close the database connection
db.close();