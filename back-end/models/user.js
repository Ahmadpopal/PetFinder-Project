"use strict";

const bcrypt = require('bcrypt');

const db = require('../db');
const { NOTFoundError, BadRequestError, UnAuthorizedError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql')

const { BCRYPT_WORK_FACTOR } = require('../config');

class User{

// QUERY TO AUTHENTICATE USER AND RETURN USER IF YOUR EXISTS IN THE DATABASE 
static async authenticateUser(username, password){

    // SELECT USER ROW FROM THE DATABASE BY COMPARING THE USERNAME PASSED BY THE USER 
    const result = await db.query(
        `SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                phone,
                is_admin AS "isAdmin"
                FROM users 
                WHERE username = $1`,
                [username],
    );

    const user = result.rows[0];

    // IF USER IS FOUND:
    //     - WE COMPARE THE PASSWORD STORED IN THE DATABASE WITH THE PASSWORD SENT BY USER
    //         - IF MATCHED OR TRUE 
    //             - DELETE PASSWORD FROM USER ROW 
    //             - RETURN USER 
    if ( user ){
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword === true ) {
            delete user.password;
            return user;
        }
    }

    // IF USERNAME OR PASSWORD INCORRECT THROW UNAUTHORIZED USER ERROR 
    throw new UnAuthorizedError("Invalid User or Password")
}


// QUERY TO CREATE/REGISTER USER AND ADD IT TO USERS TABLE IN DATABASE  
static async createUser(
    {username, password, firstName, lastName, email, phone, isAdmin}){

    // CHECK IF USER ALREADY EXISTS IN THE DATABASE 
    const checkIfUserExist = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1`,
            [username],
        );

        // IF ALREADY EXISTS THROW BadRequestError USER ALREADY EXISTS 
        if (checkIfUserExist.rows[0]){
            throw new BadRequestError(`User Already Exists ${username}`)
        }

        // HASH THE PASSWORD USING BCRYPT HASHING FUNCTION 
        //     - PASSWORD FROM USER END IS PASSED
        //     - AND BCRYPT_WORK_FACTOR IS PASSED FROM CONFIG FILE WHICH IS SET TO 12
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // ADD && STORE USER'S INFROMATIOIN TO THE DATABASE 
        const result = await db.query(
                `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email,
                phone,
                is_admin)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING username, first_name, last_name, email, phone, is_admin AS isAdmin`,
                [username,
                hashedPassword,
                firstName,
                lastName,
                email,
                phone,
                isAdmin,
            ],
        );

        const user = result.rows[0];

        // RETURN USER 
        return user; 
}


// QUERY TO GET ALL USERS FROM THE DATABASE 
static async getAllUsers(){
    // GET ALL THE USERS DATA STROED IN THE USER'S TABLE IN THE DATBASE 
    const result = await db.query(
        `SELECT username, 
                first_name AS firstName, 
                last_name AS lastName, 
                email, 
                phone, 
                is_admin AS isAdmin
        FROM users
        ORDER BY username`,
    );
    
    // RETURN USERS DATA 
    return result.rows;
}


// QUERY TO GET USER BY USERNAME FROM THE DATABASE 
static async getUserByUsername(username){

    // GET USER DATA FROM THE DATABASE BY PASSING USERNAME 
    const userResult = await db.query(
        `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                phone,
                is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`,
        [username],
    );

    const user = userResult.rows[0];
    
    // IF USER NOT EXISTS THROW ERROR 
    if(!user) throw new NOTFoundError(`User Not Found: ${username}`);


    // RETURN UER DATA 
    return user; 
}



// QUERY TO UPDATE USERS 
static async updateUser(username, data){

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin",
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NOTFoundError(`No user: ${username}`);

    delete user.password;
    return user;
}


// QUERY TO REMOVE USER FROM DATABASE 
static async removeUser(username){

    // DELETE USER FROM THE DATABASE BY PASSING USERNAME 
    let result = await db.query(
        `DELETE 
        FROM users
        WHERE username = $1
        RETURNING username`,
        [username],
    );

    const user = result.rows[0];
    
    // IF USER NOT EXIST THROW AN ERROR 
    if(!user) throw new NOTFoundError(`User Not Found: ${username}`);

}


}


module.exports = User;