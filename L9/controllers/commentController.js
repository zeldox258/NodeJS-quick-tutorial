const Comment = require('../models/commentModel');
const Entry = require('../models/entryModel');

const createComment = async (req, res) => {
   try {
      const { content, entryId } = req.body;

      //check if entry exists
      const entry = await Entry.findById(entryId);
      if (!entry) {
         return res.status(404).json({ error: 'Entry not found' });
      }

      const newComment = new Comment({ content, userId: req.user.id, entryId, likes: [] });
      const comment = await newComment.save();
      res.status(201).json({ comment });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getCommentById = async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ comment });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getCommentsByEntryId = async (req, res) => {
   try {
      const comments = await Comment.find({ entryId: req.params.id, referenceId: { $exists: false }  });
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsByPageAndEntryId = async (req, res) => {
   try {
      const { page, entryId } = req.params;
      const comments = await Comment.find({ entryId: entryId, referenceId: { $exists: false }  }).skip((page - 1) * 5).limit(5);
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsByPageLimitAndEntryId = async (req, res) => {
   try {
      const { page, limit, entryId } = req.params;
      const comments = await Comment.find({ entryId: entryId, referenceId: { $exists: false } }).skip((page - 1) * limit).limit(limit);
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const likeComment = async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found' });
      }
      if (comment.likes.includes(req.user.id)) {
         comment.likes = comment.likes.filter(userId => userId != req.user.id);
      }
      else{
         comment.likes.push(req.user.id);
      }
      await comment.save();
      res.status(200).json({ comment });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsSortedByLikeCountAtEntry = async (req, res) => {
   try {
      const comments = await Comment.find({ entryId: req.params.id, referenceId: { $exists: false } }).sort({ likes: -1 });
      res.status(200).json({ comments });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const addReply = async (req, res) => {
   try {
      const commentId = req.params.id;
      const { content } = req.body;
      const comment = await Comment.findById(commentId);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found' });
      }
      const newReply = new Comment({ content, userId: req.user.id, entryId: comment.entryId, referenceId: commentId, likes: [] });
      const reply = await newReply.save();
      res.status(201).json({ reply });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getReplies = async (req, res) => {
   try {
      const replies = await Comment.find({ referenceId: req.params.id });
      res.status(200).json({ replies });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentLikeCount = async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ likeCount: comment.likes.length });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentReplyCount = async (req, res) => {
   try {
      const replies = await Comment.find({ referenceId: req.params.id });
      res.status(200).json({ replyCount: replies.length });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsSortedByContentLengthAtEntry = async (req, res) => {
   try {
      //option 1
      const comments = await Comment.find({ entryId: req.params.id, referenceId: { $exists: false } });
      comments.sort((a, b) => a.content.length - b.content.length);
      //option 2
      /*
         const comments = await Comment.aggregate([
            { $match: { entryId: req.params.id, referenceId: { $exists: false } } },
            { $addFields: { contentLength: { $strLenCP: "$content" } } }, // Add content length field
            { $sort: { contentLength: 1 } } // Sort by content length (ascending)
         ]);
      */

      res.status(200).json({ comments });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}


module.exports = {
   createComment,
   getCommentById,
   getCommentsByEntryId,
   getCommentsByPageAndEntryId,
   getCommentsByPageLimitAndEntryId,
   likeComment,
   getCommentsSortedByLikeCountAtEntry,
   addReply,
   getReplies,
   getCommentLikeCount,
   getCommentReplyCount,
   getCommentsSortedByContentLengthAtEntry
};