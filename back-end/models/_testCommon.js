const bcrypt = require("bcrypt");


const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');


// ******************* RUN COMMONBEFOREALL FUNCTION BEFORE ALL TESTS RUN ************************* 
    // - DELETE ALL USERS FROM TEST DATABASE 
    // - INSERT IN TO DATABASE 
    // - HASH THE PASSWORD 

async function commonBeforeAll(){

    await db.query('DELETE FROM users');

    await db.query(`
    INSERT INTO users(username,
                      password,
                      first_name,
                      last_name,
                      email,
                      phone)
    VALUES ('test1', $1, 'test1', 'test1', 'test1@test.com', '000-000-0000'),
           ('test2', $2, 'test2', 'test2', 'test2@test.com', '000-000-0000')
    RETURNING username`,
  [
    await bcrypt.hash("12345678", BCRYPT_WORK_FACTOR),
    await bcrypt.hash("12345678", BCRYPT_WORK_FACTOR),
  ]);
}

// ******************* RUN COMMONBEFOREACH FUNCTION BEFORE EACH TEST RUN ************************* 
async function commonBeforeEach(){
    await db.query('BEGIN');
}


// ******************* RUN COMMONAFTEREACH FUNCTION AFTER EACH TEST RUN ************************* 
async function commonAfterEach(){
    await db.query('ROLLBACK');
}

// ******************* RUN COMMONAFTERALL FUNCTION AFTER ALL TEST RUN ************************* 
    // - STOP DATABASE AFTER ALL TEST RUN 
async function commonAfterAll(){
    await db.end();
}



module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
}