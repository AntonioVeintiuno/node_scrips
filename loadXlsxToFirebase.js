// THIS SCRIPT LOAD A XLSX FILE TO FIREBASE
const readXlsxFile = require('read-excel-file/node');
const { db } = require('./firebase');
// File path.
readXlsxFile('./fresmty.com.xlsx').then((rows) => {
  console.log('rows.length', rows.length)
  rows.map((row, i ) => {
    if (i > 80) {
      db.collection('products').doc('sku001').set({
        name: row[1], price: [2], measure: row[3], department: row[0]
      });
    }
    console.log('row de deta mandre', row)
  })
  // `rows` is an array of rows
  // each row being an array of cells.
})