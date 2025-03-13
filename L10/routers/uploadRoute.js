const express = require('express');
const uploadController = require('../controllers/uploadController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');

const router = express.Router();

// Define your routes here
router.post('/upload', uploadController.uploadRequest);

module.exports = router;