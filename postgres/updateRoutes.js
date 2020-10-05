// this script consult a postgresdb and update data.
const { Client } = require("pg");

const client = new Client({
  user: "root",
  host: "localhost",
  database: "sales",
  password: "facebook98",
  port: 5432,
});

const mainFunction = async () => {
  client.connect();
  let query = `SELECT * FROM "RouteFares";`;

  try {
    const { rows: routeFares } = await client.query(query);
    routeFares.map(async (routeFare) => {
      const queryFare = `SELECT * FROM "Fares" WHERE id = ${routeFare.fareId};`;
      const { rows: [fare] } = await client.query(queryFare);
      let journey;

      const searchJourney = `SELECT id FROM "Journeys" WHERE "quoteRequestId" = ${fare.quoteRequestId};`;
      journey = await client.query(searchJourney);
      if (journey.rows.length = 0) {
        journey = journey.rows[0].id
        console.log("journey encontrado", journey);
      } else {

      // if (journey) {
// exampel query to set if not exist
//       const insertIf  = ` INSERT INTO example_table
//     (id, name)
// SELECT 1, 'John'
// WHERE
//     NOT EXISTS (
//         SELECT id FROM example_table WHERE id = 1
//     );`

        const queryJourney = {
          text: `INSERT INTO "Journeys" ("quoteRequestId", "createdAt", "updatedAt") VALUES ($1, $2, $3) RETURNING id`,
          values: [fare.quoteRequestId, new Date(), new Date()],
        };
        // insert new journey
        const { rows: [row] } = await client.query(queryJourney);
        journey = row.id;
        console.log("journey insertado", journey);
      }
      console.log('journey ', journey)
      // insert route journey
      const queryRouteJourney = {
        text: `INSERT INTO "RouteJourneys" ("journeyId", "routeId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4)`,
        values: [journey, routeFare.routeId, new Date(), new Date()],
      }
      // insert new journey route
      const res = await client.query(queryRouteJourney);
      console.log('donde', res)
    });
  } catch (err) {
    console.log("error alv(amo la vida) ", err);
    console.log(err.stack);
  } //finally {
  //   client.end();
  // }
};

mainFunction().catch(console.error);
