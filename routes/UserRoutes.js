const express = require("express");
const UserRouter = express.Router();
const userController = require("../controllers/UserController");
const validateToken = require("../controllers/validateToken");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testUser"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User successfully registered
 *       400:
 *         description: Missing required fields or duplicate user
 */
UserRouter.route("/register").post(userController.createUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testUser"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
UserRouter.route("/login").post(userController.loginUser);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update user password (Protected)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - oldP
 *               - newP
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testUser"
 *               oldP:
 *                 type: string
 *                 example: "oldPassword123"
 *               newP:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Incorrect old password
 */
UserRouter.route("/update").put(validateToken,userController.updateUser);

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Get current user details (Protected)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user details
 *       401:
 *         description: Unauthorized
 */
UserRouter.route("/current").get(validateToken, userController.getCurrent);


/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request - Couldn't delete user
 */
UserRouter.route("/delete").delete(validateToken, userController.deleteUser);



module.exports = UserRouter;
