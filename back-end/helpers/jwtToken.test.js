const jwt = require('jsonwebtoken');
const {createToken } = require('./jwtToken');
const { SECRET_KEY } = require('../config');

// TEST createToken FUNCTION TO GERATE TOKEN WHEN DATA PASSED 

//     - TEST USERNAME WITH ISADMIN FALSE 
//     - TEST USERNAME WITH ISADMIN TRUE 
//     - TEST USERNAME WITHOUT PASSING THE THE ISADMIN PROPERTY 


describe("GENERATE TOKEN", () => {

    test('CREATE TOKEN NOT ADMIN', () => {
        const token = createToken({ username: "test", isAdmin: false});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });

    test("CREATE TOKEN IS ADMIN", () => {
        const token = createToken({username: "test", isAdmin: true});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: true,
        });
    });

    test("CREATE TOKEN IS ADMIN", () => {
        const token = createToken({username: "test"});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });



})