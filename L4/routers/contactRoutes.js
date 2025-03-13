const contactController = require('../controllers/contactController');
const express = require('express');

const router = express.Router();

router.get('/contacts/:id', contactController.authDelete);
router.get('/contacts', contactController.getContacts);
router.get('/contactsAuth', contactController.contactsAuth, contactController.getContactsAuth);

module.exports = router;
//