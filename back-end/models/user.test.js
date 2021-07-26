"use strict";

const {
    BadRequestError,
    NOTFoundError,
    UnAuthorizedError
} = require('../expressError');
const db = require('../db');
const User = require('./user');
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require('./_testCommon');


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



// *******************AUTHENTICATE USER TEST*************************

describe("AUTHENTICATE USER ", () => {
    test("AUTHENTICATE WORKS", async () => {
        const user = await User.authenticateUser("test1", "12345678");
        expect(user).toEqual({
            username: "test1",
            firstName: "test1",
            lastName: "test1",
            email: "test1@test.com",
            phone: "000-000-0000",
            isAdmin: false
        });
    });

    test("AUTH WORNG PASSWORD", async () => {
        try {
          await User.authenticateUser("test3", "wrongPassword");
          fail();
        } catch (err) {
          expect(err instanceof UnAuthorizedError).toBeTruthy();
        }
      });
})


// *******************REGISTER USER TEST*************************

describe('REGISTER USERS', () => {
    const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.com",
    phone: "000-000-0000",
    isAdmin: false,
    };


    test("REGISTER USER", async () => {
        let user = await User.createUser({
            ...newUser, 
            password: "password",
        });
        const found = await db.query(`SELECT * FROM users WHERE username = 'new'`);
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(false);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    })

    test("ADD IS ADMIN ", async function () {
        let user = await User.createUser({
          ...newUser,
          password: "password",
          isAdmin: true,
        });
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(true);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
      });

      test("BAD REQUEST DUBLICATE USER", async function () {
        try {
          await User.createUser({
            ...newUser,
            password: "password",
          });
          await User.createUser({
            ...newUser,
            password: "password",
          });
          fail();
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy();
        }
      });
})



// *******************GET ALL USERS FROM DATABASE TEST*************************

describe("GET ALL USERS FROM DATABASE ", function () {
    test("GET ALL USERS ", async function () {
      const users = await User.getAllUsers();
      expect(users).toEqual([
        {
          username: "test1",
          firstname: "test1",
          lastname: "test1",
          email: "test1@test.com",
          phone: "000-000-0000",
          isadmin: false,
        },
        {
          username: "test2",
          firstname: "test2",
          lastname: "test2",
          email: "test2@test.com",
          phone: "000-000-0000",
          isadmin: false,
        },
      ]);
    });
  });
  

// *******************GET ALL USERS BY ID FROM DATABASE TEST*************************


describe("GET USER BY USERNAME", function () {
    test("GET USER BY USERNAME", async function () {
      let user = await User.getUserByUsername("test1");
      expect(user).toEqual({
        username: "test1",
        firstName: "test1",
        lastName: "test1",
        email: "test1@test.com",
        isAdmin: false,
      });
    });

});


// *******************UPDATE USER IN THE DATABASE TEST*************************

describe("update", function () {
    const updateData = {
      firstName: "updatetest1",
      lastName: "updatetest1",
      email: "new@email.com",
      isAdmin: true,
    };
  
    test("works", async function () {
      let job = await User.updateUser("test1", updateData);
      expect(job).toEqual({
        username: "test1",
        ...updateData,
      });
    });

});

// *******************REMOVE USER FROM DATABASE TEST*************************

describe("remove", function () {
    test("REMOVE USER FROM DATABASE ", async () => {
      await User.removeUser("test1");
      const res = await db.query(
          "SELECT * FROM users WHERE username='test1'");
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such user", async function () {
      try {
        await User.removeUser("worngUser");
        fail();
      } catch (err) {
        expect(err instanceof NOTFoundError).toBeTruthy();
      }
    });
  });
  