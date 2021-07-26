
// PACKAGES IMPORTED FROM NODE_MODULES
const { Client } = require('pg');

// FILES IMPORTED FROM PETFINDER APP 
const { getDatabaseUri } = require('./config');



// INCLUDE DATABASE IN THE APPLICATION 
const db = new Client({
    connectionString: getDatabaseUri(),
});


// CONNECT WITH DATABASE 
db.connect();


module.exports = db;


