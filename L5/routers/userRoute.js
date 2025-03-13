const express = require('express');
const userController = require('../controllers/userController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');

const router = express.Router();

// Define your routes here
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user',userMiddleware.authUser, userController.getUserDetails);
router.post('/updatePassword',userMiddleware.authUser, userController.updatePassword);

module.exports = router;