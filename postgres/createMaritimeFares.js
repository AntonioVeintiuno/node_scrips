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
    readXlsxFile("../files_to_load/maritime-fares-dev.xlsx").then(async (rows) => {
      rows.map(async (row, i) => {
        const startDate = (row[17] && row[17] !== 'NULL') ? row[17] : null;
        const ofMin = (row[26] && row[26] !== 'NULL') ? parseFloat(row[26]) : null;
        if (i > 2 && i < 6) {
          console.log('row[1]', row[17])
          let query = `INSERT INTO "MaritimeFares" (
            "type", "container20", "container40",	"originPortId", "destinationPortId",
            "externalCompanyId", "group", "expirationDate", "externalBusinessId", "profit",
            "transitDays", "externalAgentId", "startDate", "comments",	"containerSubTypeId",
            "delayFreeDaysOrigin", "delayFreeDaysDestination", "loadType", "cbm", "of",
            "ofMin", "imo", "deconsolidation", "liberation", "via",
            "frequency","total", "tax", "profitContainer20", "profitContainer40",
            "currencyId", "createdAt", "updatedAt")
            VALUES (
              ${row[1]}, ${row[2]}, ${row[3]}, ${row[6]}, ${row[8]},
              ${row[9]}, ${row[10]}, '${row[11]}'::date, ${row[12]}, ${row[13]},
              ${row[15]}, ${row[16]}, '${row[17]}'::date, ${row[18]}, ${row[20]},
              ${row[21]}, ${row[22]}, ${row[23]}, ${row[24]}, ${row[25]},
              ${ofMin}, ${row[27]}, ${row[28]}, ${row[29]}, ${row[30]},
              ${row[31]}, ${row[32]}, ${row[33]}, ${row[34]}, ${row[35]},
              ${row[35]}, NOW(), NOW());`;
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
  } catch (e) {
    console.error(e);
  } finally {
    // await client.close();
    // await client.end();
  }
};

main().catch(console.error);
