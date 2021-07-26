"use strict";


const express = require('express');
const jsonschema = require('jsonschema');


const User = require('../models/user');
const { createToken } = require('../helpers/jwtToken');
const { isAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn } = require('../middleware/auth');
const createNewUserWithisAdminSchema = require('../schema/createNewUserWithisAdmin.json');
const userUpdateSchema = require('../schema/userUpdateSchema.json')
const { BadRequestError } = require('../expressError');




const router = express.Router();


// ROUTE TO REGISTER USERS / CREATE NEW USERS && SET isAdmin to true or false 
router.post('/',isAdmin, async (req, res, next) => {
    try{

        const newUserSchemaValidator = jsonschema.validate(req.body, createNewUserWithisAdminSchema);
        if(!newUserSchemaValidator.valid){
            const errors = newUserSchemaValidator.errors.map(err => err.stack)
            throw new BadRequestError(errors)
        }


        const user = await User.createUser(req.body)
        const token = createToken(user);
        return res.status(201).json({ user, token })
    }catch(err){
        return next(err)
    }
})


// ROUTE TO GET ALL THE USERS FROM THE THE DATABASE 
router.get('/', async (req, res, next) => {
try{
    const allUsers = await User.getAllUsers();
    return res.json({ allUsers });
}catch(err){
    return next(err)
}
})



// ROUTE TO GET USER BY USERNAME 
router.get('/:username',ensureCorrectUserOrAdmin,  async(req, res, next) => {
    try{
        const { username } = req.params
        const user = await User.getUserByUsername(username)
        return res.json({ user })

    }catch(err){
        return next(err)
    }
})


// ROUTE TO UPDATE USER 
router.patch('/:username', ensureCorrectUserOrAdmin, async(req, res, next) => {
try{
    const userUpdateValidator = jsonschema.validate(req.body, userUpdateSchema);
    if( !userUpdateValidator.valid ){
        console.log(userUpdateValidator)
        const errors = userUpdateValidator.errors.map(err => err.stack);
        throw new BadRequestError(errors)
    }

    const user = await User.updateUser(req.params.username, req.body);
    return res.json({ user })
}catch(err){
    return next(err)
}
})


// ROUTE TO REMOVE USER
router.delete('/:username', ensureCorrectUserOrAdmin,async(req, res, next) => {
    try{
        await User.removeUser(req.params.username);
        return res.json({ 
            message: `deleted: ${req.params.username} Account Deleted`
        }); 
    }catch(err){
        return next(err)
    }
})





module.exports = router;