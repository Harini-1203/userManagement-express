const request = require("supertest");
const app=require("../index")
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

let token; // To store JWT token for protected routes

// Before all tests, connect to a test DB
beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// After all tests, close DB connection
afterAll(async () => {
    await mongoose.connection.close();
});

// Test user registration
describe("User Registration", () => {
    it("should register a new user", async () => {
        const res = await request(app).post("/register").send({
            username: "testUser",
            email: "test@example.com",
            password: "Test123!",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "user created");
    });

    it("should fail for duplicate user", async () => {
        const res = await request(app).post("/register").send({
            username: "testUser",
            email: "test@example.com",
            password: "Test123!",
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message", "username or email already exists");
    });
});

// Test user login
describe("User Login", () => {
    it("should login with valid credentials", async () => {
        const res = await request(app).post("/login").send({
            username: "testUser",
            password: "Test123!",
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("accesstoken");
        token = res.body.accesstoken; 
    });

    it("should reject invalid login", async () => {
        const res = await request(app).post("/login").send({
            username: "testUser",
            password: "WrongPassword",
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message", "invalid username or password");
    });
});

// Test protected profile retrieval
describe("Update password", () => {
    it("should update password with valid token", async () => {
        const res = await request(app)
            .put("/update")
            .set("Authorization", `Bearer ${token}`)
            .send({
                oldP: "Test123!",
                newP: "NewPass456!",
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Password changed successfully");
    });

    it("should reject access without a token", async () => {
        const res = await request(app).put("/update");

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "No token provided");
    });

    it("should reject password update with incorrect old password", async () => {
        const res = await request(app)
            .put("/update")
            .set("Authorization", `Bearer ${token}`)
            .send({
                oldP: "WrongPassword!",
                newP: "NewPass789!",
            });

        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty("message", "Incorrect password");
    });
});

// Test user deletion
describe("User Deletion", () => {
    it("should delete user with valid token", async () => {
        const res = await request(app)
            .delete("/delete")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(204);
    });

    it("should reject deletion without token", async () => {
        const res = await request(app).delete("/delete");

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "No token provided");
    });
});
