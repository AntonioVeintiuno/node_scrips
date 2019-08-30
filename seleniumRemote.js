// this script is to run a selenium test remote
var webdriver = require('selenium-webdriver');
const sqlite3 = require('sqlite3').verbose();
var request = require("request");

let db = new sqlite3.Database('./db/sample.db');
let cbtHub = "http://192.168.12.208:4444/wd/hub";
let sql = `SELECT DISTINCT Name name, Status status FROM items WHERE Status = ?
ORDER BY name`;
let update = `UPDATE items SET status = ? WHERE name = ?`;

var options = { method: 'GET', url: 'http://192.168.12.208:4444/grid/api/hub'};

function getPendingRegist() {
  db.all(sql, ['pendiente'], (err, rows) => {
    if (err) {
      throw err;
    }

    rows.forEach((row, index) => {
      // request.get(options.url, function (error, response) {
        //   if (error) throw new Error(error);
        //   console.log(JSON.parse(response.body));
        // });
        basicExample(row);
      });
    });
  //close the database connection
  // db.close();
}

function updateRow(status, name){
  db.run(update, [status, name], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
  //close the database connection
  db.close();
}

  async function basicExample(row){
    try{
      var driver = new webdriver.Builder().usingServer(cbtHub).withCapabilities({'browserName': 'internet explorer'}).build();

      await driver.get('http://www.google.com');
      driver.findElement(webdriver.By.name('q')).sendKeys(row.name).then(function(){
        driver.getTitle().then(function(title) {
          if (title) {
            console.log(title);
            // updateRow('done', row.name);
          } else {
            console.log('qlq')
          }
          driver.quit();
        });
      });
    }

    catch(err){
      handleFailure(err, driver);
    }

  }

  function handleFailure(err, driver) {
    console.error('Something went wrong!\n', err.stack, '\n');
    driver.quit();
  }

  getPendingRegist();
