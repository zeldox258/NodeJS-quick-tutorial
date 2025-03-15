const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entryController');
const userMiddleware = require('../middlewares/userMiddleware');


/**
 * @swagger
 * /entry/user:
 *   get:
 *     summary: Verilen userin entrylerini getirir
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Aranan entry bulundu
 *       400:
 *         description: Geçersiz giriş parametreleri
 */

//write swagger for create entry
/**
 * @swagger
 * /entry/create:
 *   post:
 *     summary: Create a new entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entry'
 *     responses:
 *       200:
 *         description: Entry created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.post('/create', userMiddleware.authUser, entryController.createEntry);
router.get('/user', userMiddleware.authUser, entryController.getUserEntries);
router.delete('/:id', userMiddleware.authUser, entryController.deleteEntry);
router.put('/:id', userMiddleware.authUser, entryController.updateEntry);
router.get('/', entryController.getAllEntries);
router.get('/limit/:limit', entryController.getLastEntriesByLimit);
router.get('/:id', entryController.getEntryById);
router.post('/:id/like', userMiddleware.authUser, entryController.likeEntry);

module.exports = router;