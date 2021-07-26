# PetFinder-Application
INTRODUCTION 
    Pet Adoption is an Application, where users  can look for the pets of their choice to adopt. the Application requires users to register
    themselves. after login to their accounts users can be able to choose and process the pet adoption as per instructed in the application 
    
    
    TO USE THIS APPLICATION 
      CLONE THE GITHUT REPOSITORY TO YOUR MACHINE 
        - INSTALL ALL THE DEPENDECIES 
            - npm install OR npm i 
        RUN FRONT-END SERVER 
          - PORT 3000 
        RUN BACK-END SERVER 
          - PORT 3001

API USED TO GET ANIMALS DATA [PET FINDER WEBSITE ]
        - https://www.petfinder.com/developers/v2/docs/

            pet finder website requires developers to register before they give access to any of the endpoints. 
            after registration developers will be provided api-key and api-secret. 
            
        ENDPOINTS 
              USAGE 
        - we can get all animals DATA
        - we can get animals by type 
        - we can get animals by breed
        - we can get animals by id 
        - etc..... 
        
    PACKAGES INSTALLED FOR BACK-END APP 
    app.js
        - epxress
        - cors
        - morgan

    config.js
        - colors 
        - dotenv
    
    db.js
        - pg 

    models/user
        - bcrypt

    helpers/ jwtTokens
    - jwt [json web token ]

    routes/
        - users 
        - petRoutes
            - jsonschema
        
    routes/
        - users.test.js
            - supertest
