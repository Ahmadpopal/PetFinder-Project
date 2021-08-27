  
  # PetFinder-Application
  

  # Introducation

    Pet Adoption is  a web application for finding different types of pets for adoptio.
    
    Users can register/Login to Search for types of pets in the search query, select the specific categories
    of pets find the contact deatils of the pet in order to adopt them. 
    
    After logging in the web app users will be able to see pets in categories where they can decide to select
    thier choice of the animals. 
    
    when user select the categoies they will be redirect to the page where they can see cards of pets listed in
    the page and a search bar, which gives user ablity to choose pets with specified details. up on clicking 
    on the pet card, users will be redirect to page where they can see more details about their choice of pet. 
    
      
    TO use/run THIS APPLICATION 
  
      CLONE THE GITHUT REPOSITORY TO YOUR MACHINE 
        - INSTALL ALL THE DEPENDECIES 
            - npm install OR npm i 
        RUN FRONT-END SERVER 
          - PORT 3000 
        RUN BACK-END SERVER 
          - PORT 3001
    
    
 # Features 
    
    SQL Data base is used for this web application, where users can regiester, login and updated their profile 
    later if they want to. 
    
    i choose to focus on using a little bit of everything for this full stack project Database, API, routing, 
    testing designing etc... 
    
    Looking forward I would love to revisit pet adoption project and add featuers, such as user favorites where
    users can save their pet options in the database and can revisit them latter, sharing where users can share
    the pet details with families and freinds before they adopt them. 
    
  
   # Data
    
    The pet adoption web app uses the petfinder API to receive pet data. 
    
        - https://www.petfinder.com/developers/v2/docs/
    
    Petfinder API provides greate details on each animal.The endpoints provide  broad access to the information, 
    they offer greate value to users/developers. Petfinder is also a web application that allow users to directly 
    adopt pets from their website. the API's can be use for personal projects and also business purposes, but if 
    you choose to use it for business the API services will require payment.
    
        - ENDPOINTS  
            - we can get all animals DATA
            - we can get animals by type 
            - we can get animals by breed
            - we can get animals by id 
    
    
   # Technologies 
   This application uses Node with Express for server-side logic. 
   
   React Framwork is used to build the front-end logic and styling is largely handled by reactstrap, bootstrap and custom CSS.
   
   Database managament is done with PostgreSQL for object-realational mapping.
   
   Front-end Intraction with the back-end is all done with RESTfull routing. 
   
   
    
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
            - supertest
             - jsonschema
