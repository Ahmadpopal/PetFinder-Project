
// PACKAGES IMPORTED FROM NODE_MODULES
let petfinder = require("@petfinder/petfinder-js");
const { response } = require("./app");
const { SECRET_KEY } = require("./config");


// FILES IMPORTED FROM PETFINDER APP 
let { BadRequestError } = require('./expressError')

// GMAIL AUTHS


// FACEBOOK AUTHS

// let API_KEY = "LJBjHvBDNldaeHn1KhNbuVCn2OpTlzmFsRHF3FHNetBsc7YnrM";
// let API_SECRET_KEY = "GjTfcbiWL2OJw0s9ipbKVv8D5ki0PklTubGKTCoM";



// API_KEY 
let API_KEY = "EYUXpjtxR3RfJr0JmXFaNAPB6Md5QG8Qtspnyy7YzDjJKFtpuf";
// API SECRET_KEY
let API_SECRET_KEY = "fDLVLR7TtnQeYUGpMxgyTNYODchkvfwR5wPlBGHa";

var pf = new petfinder.Client({apiKey: API_KEY, secret: API_SECRET_KEY})

// PETFINDER API USE FUNCTION 

    // - AFTER INSTALLING PETFINDER PACKAGE 
    // - IMPORT PETFINDER PACKAGE 
    // - PROVIDE API-KEY AND SECRET-KEY 
    // - CALL  PETFINDER INSTANCE SAVE IT TO A VAR PF 
    // - USE PF INTANCE TO GET DATA REGARDING ANIMALS BY TYPE / BREED / LOCATION ETC...API_KEY.



    // =================================================

// FUNCTION TO GET ALL PETS 
async function getAllPets(){
    let allPets;
    await pf.animal.search({
        limit: 100
    })
    .then((resp) => {
       allPets = resp.data.animals
       
    })
    .catch((error) => {
        throw new BadRequestError(`${error}`)
    })

    return allPets
}

    // =================================================

// FUNCTION TO GET ANIMAL BY TYPE 
async function getAnimalByType(type){
    let allPets;
    await pf.animal.search({
        type: type, 
        limit: 100
    })
    .then((resp) => {
       allPets = resp.data.animals
       
    })
    .catch((error) => {
        throw new BadRequestError(`${error}`)
    })

    return allPets
}

    // =================================================

// GET ANIMAL BY ID 

async function getAnimalById(id){
    let animal = [];

    await pf.animal.show(id)
    .then((response) => {
        animal.push(response.data.animal)
    })
    .catch((error) => {
        throw new BadRequestError(`${error}`)
    })

    return animal
}




    // =================================================

// FUNCTION TO SEARCH FOR ANIMAL 

async function searchForAnimal(type, breed, age, gender, size, coat){
    let animals;
    await pf.animal.search({
        type: !type ? null : type,
        breed: !breed ? null : breed,
        age: !age ? null : age,
        gender: !gender ? null : gender,
        size: !size ? null : size,
        coat: !coat ? null : coat,
        limit: 100,
    })
    .then((resp) => {
       animals = resp.data.animals
       
    })
    .catch((error) => {
        throw new BadRequestError(`${error}`)
    })

    return animals
}





module.exports = {
    getAllPets,
    getAnimalByType,
    getAnimalById,
    searchForAnimal,
}