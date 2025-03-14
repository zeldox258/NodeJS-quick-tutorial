const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const userMiddleware = require('../middlewares/userMiddleware');

router.post('/create', userMiddleware.authUser, commentController.createComment);
router.get('/entry/:id', commentController.getCommentsByEntryId);
router.get('/:id', commentController.getCommentById);
router.get('/entry/:entryId/:page', commentController.getCommentsByPageAndEntryId);
router.get('/entry/:entryId/:page/:limit', commentController.getCommentsByPageLimitAndEntryId);
router.post('/like/:id', userMiddleware.authUser, commentController.likeComment);
router.get('/getCommentsSortedByLikeCountAtEntry/:id', commentController.getCommentsSortedByLikeCountAtEntry);
router.post('/addReply/:id', userMiddleware.authUser, commentController.addReply);
router.get('/getReplies/:id', commentController.getReplies);
router.get('/getCommentLikeCount/:id', commentController.getCommentLikeCount);
router.get('/getCommentReplyCount/:id', commentController.getCommentReplyCount);
router.get('/getCommentsSortedByContentLengthAtEntry/:id', commentController.getCommentsSortedByContentLengthAtEntry);


module.exports = router;