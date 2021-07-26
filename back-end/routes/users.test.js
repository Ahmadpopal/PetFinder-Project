"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");
const User = request("../models/user");


const { 
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    test1Token,
    test2Token,
    adminToken,
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// ******************* users / POST ROUTE ************************* 


describe("POST users if ADMIN IS TRUE & IF FALSE ACCESS DENIED", () => {
    test("POST USERS IF ADMIN IS TRUE ", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            username: "newUser",
            password: "12345678",
            firstName: "new",
            lastName: "user",
            email: "new@user.com",
            phone: "000-000-0000",
            isAdmin: false,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
        user: {
            username: "newUser",
            first_name: "new",
            last_name: "user",
            email: "new@user.com",
            phone: "000-000-0000",
            isadmin: false,
        }, token: expect.any(String),
    });
    });

    test("POST USERS IF ADMIN IS FALSE", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            username: "newUser",
            password: "12345678",
            firstName: "new",
            lastName: "user",
            email: "new@user.com",
            phone: "000-000-0000",
            isAdmin: false,
        })
        .set("authorization", `Bearer ${test1Token}`);
    expect(response.statusCode).toEqual(401);
    });
})


// ******************* users / GET ROUTE ************************* 


describe("GET USERS IF ADMIN IS TRUE AND DENIED ACCESS IF ADMIN IS FALSE", () =>{
    test("GET USERS IF ADMIN IS TRUE", async () => {
        const response =await request(app)
        .get("/users")
        .set("authorization", `Bearer ${adminToken}`);

        expect(response.body).toEqual({
            allUsers: [{
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
        {
                username: "test3",
                firstname: "test3",
                lastname: "test3",
                email: "test3@test.com",
                phone: "000-000-0000",
                isadmin: false,
            }]
        });
    })

    test("GET USERS IF ADMIN IS FALSE", async () => {
        const response =await request(app)
        .get("/users")
        .set("authorization", `Bearer ${test1Token}`);

        expect(response.statusCode).toEqual(401)
    });

})


// ******************* users/username / GET ROUTE ************************* 


describe("GET USER BY USERNAME IF ADMIN && SAME USER && IF ADMIN IS FALSE ACCESS DENIED", function () {
    test("IF USER IS ADMIN", async  () => {
      const response = await request(app)
          .get(`/users/test1`)
          .set("authorization", `Bearer ${adminToken}`);
      expect(response.body).toEqual({
        getUser: {
            username: "test1",
            firstName: "test1",
            lastName: "test1",
            email: "test1@test.com",
            isAdmin: false,
        },
      });
    });

    test("IF USER IS SAME USER", async  () => {
        const response = await request(app)
            .get(`/users/test1`)
            .set("authorization", `Bearer ${test1Token}`);
        expect(response.body).toEqual({
          getUser: {
              username: "test1",
              firstName: "test1",
              lastName: "test1",
              email: "test1@test.com",
              isAdmin: false,
          },
        });
      });
  
  
    test("IF USER IS NOT ADMAN || SAME USER", async () => {
      const response = await request(app)
          .get(`/users/test1`)
          .set("authorization", `Bearer ${test2Token}`);
      expect(response.statusCode).toEqual(401);
    });

});

// ******************* users/username / PATCH ROUTE ************************* 

describe("PATCH user if ADMIN IS TRUE & IF FALSE ACCESS DENIED", () => {
    test("PATCH USER IF ADMIN IS TRUE ", async () => {
        const response = await request(app)
        .patch("/users/test1")
        .send({
            firstName: "newUpdated",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(response.body).toEqual({
        user: {
            username: "test1",
            firstName: "newUpdated",
            lastName: "test1",
            email: "test1@test.com",
            isAdmin: false,
        }
    });
    });
})


// ******************* users/username / DELETE ROUTE ************************* 

describe("DELETE user if ADMIN IS TRUE & IF FALSE ACCESS DENIED", () => {
    test("DELETE USER IF ADMIN IS TRUE ", async () => {
        const response = await request(app)
        .delete("/users/test1")
        .set("authorization", `Bearer ${adminToken}`);
    expect(response.body).toEqual({
        message: `deleted: test1 Account Deleted` 
    });
    });

    test("ACCESS DENIED IF ADMIN IS FALSE ", async () => {
        const response = await request(app)
        .delete("/users/test1")
        .set("authorization", `Bearer ${test2Token}`);
    expect(response.statusCode).toEqual(401);
    });


})