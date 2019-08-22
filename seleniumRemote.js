// this script is to run a selenium test remote
var webdriver = require('selenium-webdriver');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/sample.db');

let cbtHub = "http://192.168.12.208:4444/wd/hub";
let sql = `SELECT DISTINCT Name name FROM items
           ORDER BY name`;

db.all(sql, [], (err, rows) => {
   registros = rows;
  if (err) {
    throw err;
  }

  async function basicExample(name){
    try{
      var driver = new webdriver.Builder().usingServer(cbtHub).withCapabilities({'browserName': 'internet explorer'}).build();

      await driver.get('http://www.google.com');
      driver.findElement(webdriver.By.name('q')).sendKeys(name).then(function(){
        driver.getTitle().then(function(title) {
          console.log(title);
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
  rows.forEach((row) => {
    basicExample(row.name);
  });
});

// close the database connection
db.close();
