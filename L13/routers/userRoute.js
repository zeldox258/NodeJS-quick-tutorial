const express = require('express');
const userController = require('../controllers/userController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');

const router = express.Router();

//define swagger for my login and register

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 */

// Define your routes here
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user',userMiddleware.authUser, userController.getUserDetails);
router.post('/updatePassword',userMiddleware.authUser, userController.updatePassword);
router.post('/refreshToken', userMiddleware.authUser, userController.refreshToken);
router.post('/logout', userMiddleware.authUser, userController.logout);
router.get('/getOneTimeAccessToken', userMiddleware.authUser, userController.getOneTimeAccessToken);
router.get('/getAllUserDetails', userMiddleware.authAccess, userController.getAllUserDetails);
module.exports = router;