// THIS SCRIPT LOAD DATA FILE TO MONGODB
const readXlsxFile = require("read-excel-file/node");
const { MongoClient } = require("mongodb");

// File path.
const insertData = async () => {
  const products = [];
  // `rows` is an array of rows
  // each row being an array of cells.
  await readXlsxFile('./productosNuevos.xlsx').then((rows) => {
    console.log('rows.length', rows.length)
    rows.map((row, i ) => {
      let product = {}
      if (i > 0) {
        let units = [];
        // console.log('row and i', row, i)
        product.title = row[1];
        product.price = row[2] ? parseFloat(row[2].toFixed(2)).toString() : row[2];
        product.slug = row[1];
        product.salePrice = row[2] ? parseFloat(row[2].toFixed(2)).toString() : row[2];
        product.quantity = 0;
        product.discountInPercent = '';
        product.description = row[1];
        product.type = "tienda";
        product.image = "";
        product.gallery = [];
        product.pieceWeight = row[4] ? row[4].replace('gr', '') : '0'

        if (row[3] === 'PIEZA' || row[3] === 'MANOJO' || row[3] === 'CHAROLA') {
          units = ['pz']
          product.units = units;
        }
        if (row[3] === 'KILO') {
          units = ['kg']
          product.units = units;
        }
        if (row[0] === 'FRUTA/VERDURA') {
          product.categories = [{
            "id" : 1,
            "title" : "Frutas y Verduras",
            "slug" : "Frutas y Verduras"
        }];
        }

        if (row[0] === 'ABARROTES') {
          product.categories = [{
            "id" : 2,
            "title" : "Abarrotes",
            "slug" : "Abarrotes"
        }];
        }

        product.active = true
        if (product) {
          products.push(product);
          console.log('product', product)
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
  // const uri = "mongodb+srv://user:password@develop0-xm7kf.gcp.mongodb.net/dbName";
  const uri = "mongodb+srv://user:password@develop0-xm7kf.gcp.mongodb.net/dbName";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const db = client.db('app-prod');
    const productsCollection = db.collection('products')

    const products = await insertData();
    await productsCollection.insertMany(products);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main().catch(console.error);
