const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entryController');
const userMiddleware = require('../middlewares/userMiddleware');

router.post('/create', userMiddleware.authUser, entryController.createEntry);
router.get('/user', userMiddleware.authUser, entryController.getUserEntries);
router.delete('/:id', userMiddleware.authUser, entryController.deleteEntry);
router.put('/:id', userMiddleware.authUser, entryController.updateEntry);
router.get('/', entryController.getAllEntries);
router.get('/limit/:limit', entryController.getLastEntriesByLimit);
router.get('/:id', entryController.getEntryById);

module.exports = router;