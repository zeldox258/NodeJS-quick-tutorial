const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const userMiddleware = require('../middlewares/userMiddleware');

router.post('/create', userMiddleware.authUser, commentController.createComment);
router.get('/entry/:id', commentController.getCommentsByEntryId);
router.get('/:id', commentController.getCommentById);
router.get('/entry/:entryId/:page', commentController.getCommentsByPageAndEntryId);
router.get('/entry/:entryId/:page/:limit', commentController.getCommentsByPageLimitAndEntryId);


module.exports = router;