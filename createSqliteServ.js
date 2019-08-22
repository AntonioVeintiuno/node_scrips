// this script create create a sqlite db
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('./db/sample.db');
db.run('CREATE TABLE items(name text)');
db.close();