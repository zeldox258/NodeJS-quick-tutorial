const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   email: {
      type: String,
      validate: {
         validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
         },
         message: props => `${props.path} should be a valid email, got '${props.value}'`
      },
      required: true,
      unique: true
   },
   password: {type: String, required: true},
   age: Number,
   phone: String,
   address: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;