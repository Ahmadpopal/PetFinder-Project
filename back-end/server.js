"use strict";

// FILES IMPORTED FROM PETFINDER APP 
const app = require('./app');
const {PORT } = require('./config')





// RUN SERVER ON PORT NUMBER 3001 
app.listen(PORT, () => {
    console.log(`Pet Server Started on ${PORT}`);
})