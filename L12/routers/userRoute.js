const express = require('express');
const userController = require('../controllers/userController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');

const router = express.Router();

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