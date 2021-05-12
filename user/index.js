'use strict'

// A server that uses a database. 

// express module provides basic server functions
const express = require("express");

// our database operations
const dbo = require('./databaseOps');

// Promises-wrapped version of sqlite3
const db = require('./sqlWrap');



// functions that verify activities before putting them in database
const act = require('./activity');

// object that provides interface for express
const app = express();

// use this instead of the older body-parser
app.use(express.json());


// make all the files in 'public' available on the Web
app.use(express.static('public'))

// when there is nothing following the slash in the url, return the main page of the app.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});




// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});



// call the async test function for the database
// this fills the db with test data
// in your system, you can delete this. 
dbo.testDB().catch(
  function (error) {
    console.log("error:",error);}
);





