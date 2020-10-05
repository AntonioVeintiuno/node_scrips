// this script consult a postgresdb and update data.
const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'sales',
  password: 'facebook98',
  port: 5432,
})

const mainFunction = async () => {
  client.connect();
  let query = `SELECT * FROM "ExtraFees";`;

  try {
    const {rows: extraFees} = await client.query(query);
    // console.log('object extraFees', extraFees)
    extraFees.map( async(extraFee) => {
      const queryFare = `SELECT * FROM "Fares" WHERE id = ${extraFee.fareId};`;
      const {rows: [fare]} = await client.query(queryFare);
      console.log('object Fare', fare.id);
      if (fare) {
        const updateQuery = `UPDATE "ExtraFees" SET "quoteRequestId" = ${fare.quoteRequestId} WHERE id = ${extraFee.id}`
        // console.log('updateQuery', updateQuery);
        const res = await client.query(updateQuery);
        console.log('res', res)
      }
    });
  } catch (err) {
    console.log('error alv(amo la vida) ', err)
      console.log(err.stack);
  } //finally {
  //   client.end();
  // }
}

mainFunction().catch(console.error);