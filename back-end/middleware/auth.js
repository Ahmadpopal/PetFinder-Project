"use strict";


const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnAuthorizedError } = require('../expressError');


// MIDDLEWARE : 
//     - AUTHENTICATE USER
//         - IF TOKEN WAS PROVIDED, VERIFY THE TOKEN AND STORE THE TOKEN PAYLOAD ON ResizeObserver.LOCALS 
// NO ERROR IF TOKEN WAS NOT PROVIDED OR INVALID TOKEN 

function authenticateJWT(req, res, next) {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        res.locals.user = jwt.verify(token, SECRET_KEY);
      }
      return next();
    } catch (err) {
      return next();
    }
  }


// MIDDLEWARE TO ENSURE USER IS:
    // - LOGGED IN 
    function ensureLoggedIn(req, res, next) {
        try {
          if (!res.locals.user) throw new UnAuthorizedError(`Unauthorized User`);
          return next();
        } catch (err) {
          return next(err);
        }
      }



// // MIDDLEWARE TO ENSURE USER  IS:
//     - LOGGED IN 
//     - IS ADMIN 

function isAdmin(req, res, next){
    try{
        if(!res.locals.user || !res.locals.user.isAdmin){
            throw new UnAuthorizedError(`Unauthorized User`);    
        }
        return next();

    }catch(err){
        return next(err)
    }
}

// // MIDDLEWARE TO ENSURE USER  IS:
//     - LOGGED IN 
//     - IS ADMIN 
//     - IS CORRECT USER 

function ensureCorrectUserOrAdmin(req, res, next){
    try{
        if(!(res.locals.user && (res.locals.user.isAdmin || res.locals.user.username === req.params.username))){
            throw new UnAuthorizedError(`Unauthorized User`);
        }
        return next();

    }catch(err){
        return next(err)
    }
}



module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    isAdmin,
    ensureCorrectUserOrAdmin,
}
