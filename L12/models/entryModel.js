const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   hashtags: [String],
   likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
   },
   media: {
      type: [String]
   }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;