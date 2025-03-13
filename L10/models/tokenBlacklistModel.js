const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
   token: {
      type: String,
      required: true
   },
   expiresAt: {
      type: Date,
      required: true
   }
});

const blacklist = mongoose.model('Token_Blacklist', tokenBlacklistSchema);

module.exports = blacklist;