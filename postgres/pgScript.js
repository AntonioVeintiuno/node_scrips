// this script read a file and update data in posgresdb
const readXlsxFile = require('read-excel-file/node');
const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'sales',
  password: 'facebook98',
  port: 5432,
})

// File path.
readXlsxFile('./routesBakcup.xlsx').then(async(rows) => {
  client.connect();
  rows.map(async (row, i ) => {
    if (i > 0) {
      let query = `UPDATE "Routes" SET "originAddress"='${row[3]}' WHERE "id"=${row[0]};`;
      console.log('query', query);
        try {
          const res = await client.query(query);
          console.log('Update is successfully', i);
        } catch (err) {
          console.log('error alv(amo la vida) ',i, err)
            console.log(err.stack);
        }
    }
  });
})