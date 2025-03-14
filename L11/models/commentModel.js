const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   content: {
      type: String,
      required: true
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   entryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entry',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
   },
   likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
   }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;