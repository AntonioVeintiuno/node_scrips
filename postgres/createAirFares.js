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
    await readXlsxFile("../files_to_load/airfares.xlsx").then(async (rows) => {
      rows.map(async (row, i) => {
        if (i > 1) {
          const profit = row[1] ?  row[1] : null;
          const startDate = row[7] ? row[7] : null;
          const route = row[6] ? row[6] : '';
          const comments = row[17] ? row[16] : '';
          const subcharges = row[33] ? row[33] : ''; // additionalSurcharges
          const profitPercentage = row[34] ? row[34] : null; // profitPercentage

          let query = `INSERT INTO "AirFares" ("profit",	"pricePerKg",	"total", "minimalPrice",	"startDate", "expirationDate",	"pieces",	"transitDays", "comments",	"originAirportId",
            "destinationAirportId",	"externalCompanyId", "externalAgentId", "externalBusinessId", "currencyId",
            "upToFortyFive",	"upToOneHundred",	"upToThreeHundred",	"upToFiveHundred", "upToOnethousand",
            "frecuency", "loadingAirportId", "unloadingAirportId", "tax",
            "createdAt", "updatedAt", "route", "profitPercentage", "additionalSurcharges")
            VALUES (${profit}, ${row[2]}, ${row[3]}, ${row[4]}, '${startDate}'::date,
              '${row[8]}'::date, ${row[15]}, ${row[16]}, ${comments}, ${row[20]},
              ${row[21]}, ${row[22]}, ${row[23]}, ${row[24]}, ${row[25]},
              ${row[26]}, ${row[27]}, ${row[28]}, ${row[29]}, ${row[30]},
              ${row[31]}, ${row[35]}, ${row[36]}, ${row[37]},
              NOW(), NOW(), '${route}', ${profitPercentage}, '${subcharges}');`;
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
