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
      const comments = await Comment.find({ entryId: req.params.id });
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsByPageAndEntryId = async (req, res) => {
   try {
      const { page, entryId } = req.params;
      const comments = await Comment.find({ entryId: entryId }).skip((page - 1) * 5).limit(5);
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getCommentsByPageLimitAndEntryId = async (req, res) => {
   try {
      const { page, limit, entryId } = req.params;
      const comments = await Comment.find({ entryId: entryId }).skip((page - 1) * limit).limit(limit);
      res.status(200).json({ comments });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}


module.exports = {createComment, getCommentById, getCommentsByEntryId, getCommentsByPageAndEntryId, getCommentsByPageLimitAndEntryId};