"use strick";

// PACKAGES IMPORTED FROM NODE_MODULES
require('dotenv').config();
require('colors');


// SECRET_KEY TO SIGN JSON WEB TOKENS 
const SECRET_KEY  = process.env.SECRET_KEY || "petfinder_secret_key";

// PORT NUMBER FOR SERVER TO BE RUN IN 
const PORT = +process.env.PORT || 3001; 



// IF ENOVIRONMENT IS SET TO TEST USES petfinder_test_db DATABASE ELSE USES petfinder_db DATABASE 
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "petfinder_test_db"
        : process.env.DATABASE_URL ||  "petfinder_db";
}


// SPEED UP BCRYPT DURING TESTS 
//     IF ENOVIRNEMNT IS SET TO TEST BCRYPT DURTAION IS SET TO 1
//     ELSE BCRYPT DURTAION IS SET TO 12
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;



// SHOW SERVER DISCRIPTION IN THE CONSOLE IN SPECIFIC COLORS 
console.log("Pet Adoption Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("----")



module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};