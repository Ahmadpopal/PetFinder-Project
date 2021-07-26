"use strict";

// PACKAGES IMPORTED FROM NODE_MODULES
const express = require('express');
const cors = require('cors');


// FILES IMPORTED FROM PETFINDER APP 
const { NOTFoundError } = require("./expressError");
const { authenticateJWT } = require('./middleware/auth')
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/users');
const userAuthRoutes = require('./routes/userAuth');



const morgan = require('morgan');


const app = express();


// MIDDLEWARE
    //    - CORS IS A SECUTIRY MEASERMENT NEED TO LEARN MORE ABOUT THIS 
    //    - PARSE JSON TO OBJECT
    //    - NEED TO FIND OUT WHAT MORGAN IS FOR
    //    - ATHENDTICATJWT IS TO LIMIT ACCESS IN THE ROUTES FOR USERS 
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);



// ROUTES 
    // - TO GET PETS 
    // - TO GET / POST / PATCH / DELETE USERS 
    // - TO POST LOGIN AND SIGN UP USERS 
app.use('/pets', petRoutes);
app.use('/users', userRoutes);
app.use('/auth', userAuthRoutes);


// ERROR HANDLERS 

    // - 404 ERROR HANDLER 
app.use(function(req, res, next) {
    return next(new NOTFoundError());
})

    // - GENERIC ERROR HANDLER 
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status},
    });
});



module.exports = app; 
