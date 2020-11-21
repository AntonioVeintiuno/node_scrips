// this script read a file and update data in posgresdb
const readXlsxFile = require("read-excel-file/node");
const { Client } = require("pg");

const main = async () => {
  const client = new Client({
    user: "root",
    host: "localhost",
    database: "sales",
    password: "facebook98",
    port: 5432,
  });

  try {
    // Connect to the Mysql cluster
    await client.connect();

    // File path.
    readXlsxFile("../files_to_load/airfares.xlsx").then(async (rows) => {
      rows.map(async (row, i) => {
        console.log('index', i);

        if (i > 0) {
          let query = `INSERT INTO "GroundFares" (
            "originAddress", "originZipCode", "destinationAddress", "destinationZipCode", "profit",
            "total", "startDat", "expirationDate", "distance", "transitDays",
            "maneuvers", "FSCfactor", "comments", "idTruckType", "idInlandType",
            "idCompany", "idAgent", "idBusiness", "idFrecuency", "idCurrency",
            "portId", "airportId", "movementType", "toll", "lineHaul",
            "rpkm", "serviceTypeId", "singlePrice", "fullPrice", "container20Price",
            "container40Price", "tax", "profitContainer20", "profitContainer40", "profitSingle",
            "profitFull", "createdAt", "updatedAt")
            VALUES (
              ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]},
              ${row[6]}, '${row[7]}'::date, '${row[8]}'::date, ${row[14]}, ${row[15]},
              ${row[16]}, ${row[17]}, ${row[18]}, ${row[21]}, ${row[22]},
              ${row[23]}, ${row[24]}, ${row[25]}, ${row[26]}, ${row[27]},
              ${row[28]}, ${row[29]}, ${row[30]}, ${row[31]}, ${row[32]},
              ${row[33]}, ${row[34]}, ${row[36]}, ${row[37]}, ${row[38]},
              ${row[39]}, ${row[40]}, ${row[41]}, ${row[42]}, ${row[43]},
              ${row[44]}, NOW(), NOW());`;
          try {
            const res = await client.query(query);
            console.log("Update is successfully", i);
          } catch (err) {
            console.log("error alv(amo la vida) ", i, err);
            console.log(err.stack);
          }
        }
      });
    });

    // const products = await insertData();
    // await productsCollection.insertMany(products);
  } catch (e) {
    console.error(e);
  } finally {
    // await client.close();
    // await client.end();
  }
};

main().catch(console.error);
