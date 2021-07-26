"use strict";


const express = require('express');

const { getAllPets, getAnimalById, searchForAnimal } = require('../petFinderAPIs')
const { ensureLoggedIn } = require('../middleware/auth');




const router = express.Router();



// ROUTES


// GET ALL ANIMALS 
router.get('/',ensureLoggedIn,  async (req, res, next) => {
  try{
    const allPets = await getAllPets();
    return res.json({ allPets })
  }catch(err){
    return next(err)
  }

})


// SEARCH FOR ANIMAL

router.get('/animal/search',ensureLoggedIn, async (req, res, next) => {
  try{
    const { type } = req.query
    const { breed, age, gender, size, coat } = req.query
    console.log(req.query.type, req.query.breed)
    console.log( breed, age, gender, size, coat )
    const searchAnimal = await searchForAnimal(req.query.type, req.query.breed, req.query.age, req.query.gender, req.query.size, req.query.coat)
    return res.json({searchAnimal})
  }catch(err){
    return next(err)
  }
})



// GET  ANIMAL BY TYPE 

// router.get('/type/:type', async (req, res, next) => {
//   try{
//     let { type } = req.params;
//     console.log(type)
//     const getAnimalType = await getAnimalByType(type);
//     return res.json({ getAnimalType })
//   }catch(err){
//     return next(err)
//   }

// })


// GET ANIMAL BY ID 

router.get('/:handle',ensureLoggedIn, async (req, res, next) => {
  try{
    console.log(req.params.handle)
    const getAnimal = await getAnimalById(req.params.handle)

    return res.json({ getAnimal })
  }catch(err){
    return next(err)
  }
})




// router.get('/search',(req, res, next) => {
//   try{
    
//     return res.send('Hello THIS IS SEARCH ROUTE')

//   }catch(err){
//     return next(err)
//   }
// })






// ======================================================================================


// GET ALL DOGS 
// router.get('/dogs',async (req, res, next) => {
//     try{
//         const allDogs = await getAllPets('dog');
//         return res.json(allDogs)
//       }catch(err){
//         return next(err)
//       }
//     })


// // GET ALL CATS 
// router.get('/cats', ensureLoggedIn ,async (req, res, next) => {
//     try{
//         let allCats = await getAllPets('cat');
//         return res.json(allCats)
//       }catch(err){
//         return next(err)
//       }
// })


// // GET ALL HORSES 
// router.get('/horses', ensureLoggedIn ,async (req, res, next) => {
//     try{
//         let allHorses = await getAllPets('horse');
//         return res.json(allHorses)
//     }catch(err){
//         return next(err)
//     }
// })

// // GET ALL BIRDS
// router.get('/birds', ensureLoggedIn ,async (req, res, next) => {
//     try{
//         let allBirds = await getAllPets('bird');
//         return res.json(allBirds)
//     }catch(err){
//         return next(err)
//     }
// })



// GET ANIMAL BY ID 






module.exports = router;