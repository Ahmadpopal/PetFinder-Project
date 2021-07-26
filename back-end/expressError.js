

// EXPRESSERROR EXTENDS NORMAL JS ERROR SO WE CAN 
// ADD A STATUS WHEN WE MAKE AN INSTANCE OF IT. 

class ExpressError extends Error {
    constructor(message, status){
        super();
        this.message = message,
        this.status = status
    }
}




// 404 NOT FOUND ERROR WHICH EXTENDS. 

class NOTFoundError extends ExpressError {
    constructor(message = 'Not Found'){
        super(message, 404); 
    }
}

//  400 BAD REQUEST ERROR . 

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 400);
    }
  }


//   401 UN AUTHORIZED ERROR 
class UnAuthorizedError extends ExpressError {
    constructor( message = "Unauthorized"){
        super(message, 401);
    }
}







module.exports = {
    ExpressError,
    NOTFoundError,
    BadRequestError,
    UnAuthorizedError,
}