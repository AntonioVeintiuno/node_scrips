// this script is to run a selenium test remote
var webdriver = require('selenium-webdriver'),
SeleniumServer = require("selenium-webdriver/remote").SeleniumServer;
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/sample.db');

let sql = `SELECT DISTINCT Name name FROM items
           ORDER BY name`;

let registros = [];
db.all(sql, [], (err, rows) => {
  registros = rows;
  if (err) {
    throw err;
  }
  // rows.forEach((row) => {
  //   console.log(row.name);
  // });
});

// close the database connection
db.close();


var cbtHub = "http://192.168.12.208:4444/wd/hub";


// registros.forEach(function(index) {
//   console.log('le inde',index);
  // return webdriver.promise.createFlow(function() {
  //   var driver = new webdriver.Builder().usingServer(cbtHub).withCapabilities({'browserName': 'internet explorer'}).build();

  //   console.log('Get');
  //   driver.get('http://www.google.com').then(function() {

  //        console.log('Screenshot');
  //        driver.takeScreenshot().then(function(data){

  //            console.log('foo/test' + index + '.png');
  //            //var decodedImage = new Buffer(data, 'base64')

  //            driver.quit();
  //        });
  //    });
  // });
//  });

async function basicExample(){
  try{
    var driver = new webdriver.Builder().usingServer(cbtHub).withCapabilities({'browserName': 'internet explorer'}).build();

    await driver.get('http://www.google.com');
    // await driver.getTitle().then(function(title) {
    //     console.log("The title is: " + title);
    //   });
    driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack').then(function(){
      driver.getTitle().then(function(title) {
        console.log(title);
        console.log(registros);
        driver.quit();
      });
    });
    // driver.quit();
  }

  catch(err){
    handleFailure(err, driver);
  }

}
// registros.forEach((row) => {
basicExample();
// });

function handleFailure(err, driver) {
  console.error('Something went wrong!\n', err.stack, '\n');
  driver.quit();
}