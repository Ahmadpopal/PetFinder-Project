"use strict";


const db = require('../db');
const User = require('../models/user');
const { createToken } = require('../helpers/jwtToken');



// ******************* RUN COMMONBEFOREALL FUNCTION BEFORE ALL TESTS RUN ************************* 
    // - Create 3 users before all the test Runs 

async function commonBeforeAll(){

    await db.query('DELETE FROM users');

    await User.createUser({
        username: "test1",
        password: "12345678",
        firstName: "test1",
        lastName: "test1",
        email: "test1@test.com",
        phone: "000-000-0000",
        isAdmin: false,
    });
    await User.createUser({
        username: "test2",
        password: "12345678",
        firstName: "test2",
        lastName: "test2",
        email: "test2@test.com",
        phone: "000-000-0000",
        isAdmin: false,
    });
    await User.createUser({
        username: "test3",
        password: "12345678",
        firstName: "test3",
        lastName: "test3",
        email: "test3@test.com",
        phone: "000-000-0000",
        isAdmin: false,
    });


}

// ******************* RUN COMMONBEFOREACH FUNCTION BEFORE EACH TEST RUN ************************* 

async function commonBeforeEach(){
    await db.query("BEGIN");
}


// ******************* RUN COMMONAFTEREACH FUNCTION AFTER EACH TEST RUN ************************* 

async function commonAfterEach(){
    await db.query("ROLLBACK");
}


// ******************* RUN COMMONAFTERALL FUNCTION AFTER ALL TEST RUN ************************* 
    // - STOP DATABASE AFTER ALL TEST RUN 

async function commonAfterAll(){
    await db.end();
}


// ******************* GENERATE TOKENS ************************* 

const test1Token = createToken({username: "test1", isAdmin: false })
const test2Token = createToken({username: "test2", isAdmin: false })
const adminToken = createToken({username: "admin", isAdmin: true })



module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    test1Token,
    test2Token,
    adminToken,
}
