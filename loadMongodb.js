// THIS SCRIPT LOAD DATA FILE TO MONGODB
const readXlsxFile = require("read-excel-file/node");
const { MongoClient } = require("mongodb");

// File path.
const insertData = async () => {
  const products = [];
  // `rows` is an array of rows
  // each row being an array of cells.
  await readXlsxFile('./fresmty.com.xlsx').then((rows) => {
    console.log('rows.length', rows.length)
    rows.map((row, i ) => {
      let product = {}
      if (i > 75) {
        product.unit = row[3];
        product.title = row[1];
        product.price = row[2];
        if (product) {
          products.push(product);
        }
      }
    })
  })
  return products;
};

const listDatabases = async (client) => {
  let databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const main = async () => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   * example mongodb+srv://user:password@develop0-xm7kf.gcp.mongodb.net/dbName
   */
  const uri = "mongodb+srv://user:password@develop0-xm7kf.gcp.mongodb.net/dbName";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const db = client.db('dbName');
    const productsCollection = db.collection('collectionName')

    const products = await insertData();
    await productsCollection.insertMany(products);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main().catch(console.error);
