// creating the Profile table
'use strict'

const sql = require('sqlite3');
const util = require('util');


const profileDB = new sql.Database("Profile.db");
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='Profile' ";

profileDB.get(cmd, function (err, val) {
  if (val == undefined) {
        console.log("No database file - creating one");
        createProfileTable();
  } else {
        console.log("Database file found");
  }
});


function createProfileTable(){
  
  let cmd = 'CREATE TABLE Profile ( rowIdNum INTEGER PRIMARY KEY, userId INTEGER, userName TEXT)';
  profileDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

profileDB.deleteEverything = async function() {
  await db.run("delete from Profile");
  db.run("vacuum");
}

profileDB.run = util.promisify(profileDB.run);
profileDB.get = util.promisify(profileDB.get);
profileDB.all = util.promisify(profileDB.all);


module.exports = profileDB;
