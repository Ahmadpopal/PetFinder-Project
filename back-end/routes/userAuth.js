// PACKAGES IMPORTED FROM NODE_MODULES
const express = require('express');
const jsonschema = require('jsonschema');


// FILES IMPORTED FROM PETFINDER APP 
const User = require('../models/user');
const { createToken } = require('../helpers/jwtToken');
const { BadRequestError } = require('../expressError');
const loginSchema = require('../schema/loginSchema.json');
const userAuthRegisterSchema = require('../schema/userAuthRegisterSchema.json')


const router = express.Router();


// POST ROUTE TO LOGIN THE USER 
    // - LOGIN VALIDATOR 
    //       - MATCH REQUEST BODY WITH LOGIN SCHEMA FILE PROVIDED IN THE SCHEMA FOLDER 
    //       - TO CHECK THE CORRECT DATA IS PASSED 
    //       - IF REQUIRED DATA IS NOT PASSED USERS WILL GET ERROR 

    // - AUTHENTICATE USER 
    //      - GET USERNAME AND PASSWORD FROM REQUEST-BODY 
    //      - PASS USERNAME && PASSWORD TO THE DATABASE 
    //      - PASS USER DATA TO CREATE TOKEN 
    //      - RETURN TOKEN 
router.post('/login', async (req, res, next) => {
    try{
        const loginValidator = jsonschema.validate(req.body, loginSchema);
        if(!loginValidator.valid){
            const errors = loginValidator.errors.map(err  => err.stack);
            throw new BadRequestError(errors)
        }

        const { username, password } = req.body;
        console.log(username, password)
        const user = await User.authenticateUser(username, password)
        const token = createToken(user)
        return res.json({ token })
    }catch(err){
        return next(err)
    }
})


// POST ROUTE TO REGISTER USERS AND SET ISADMIN TO FALSE 
    // - REGISTRATIONVALIDATER 
    //       - MATCH REQUEST BODY WITH REGISTRATIONSCHEMA FILE PROVIDED IN THE SCHEMA FOLDER 
    //       - TO CHECK THE CORRECT DATA IS PASSED 
    //       - IF REQUIRED DATA IS NOT PASSED USERS WILL GET ERROR 

    // - REGISTER USER 
    //      - GET USER DATA FROM REQUEST-BODY 
    //      - PASS USER DATA TO THE DATABASE 
    //      - PASS USER DATA TO CREATE TOKEN 
    //      - RETURN TOKEN 

router.post('/register', async ( req, res, next) => {
    try{
        const userRegisterValidator = jsonschema.validate(req.body, userAuthRegisterSchema);
        if(!userRegisterValidator.valid){
            const errors = userRegisterValidator.errors.map( err => err.stack);
            throw new BadRequestError(errors)
        }

        const newUser = await User.createUser({...req.body, isAdmin: false});
        const token = createToken(newUser);
        return res.status(201).json({ token });
    }catch(err){
        return next(err)
    }
})




module.exports = router;