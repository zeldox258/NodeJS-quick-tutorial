const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
   name: String,
   email: {
      type: String,
      validate: {
         validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
         },
         message: props => `${props.path} should be a valid email, got '${props.value}'`
      }
   },
   phone: {type: String, required: true}
});

const Contact = mongoose.model('Contact', contactSchema);


let authDelete = async (req, res, next) => {
   if (req.headers.authorization === 'Bearer 123456') {
      next();
   } else {
      res.status(401).send('Not Authorized');
   }
};

let getContacts = async (req, res) => {
   try {
      const contacts = await Contact.find();
      res.json(contacts);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};


let contactsAuth = (req, res, next) => {
   if (req.headers.authorization === 'Bearer 123456') {
      next();
   } else {
      res.status(401).send('Not Authorized');
   }
};

let getContactsAuth = async (req, res) => {
   try {
      const contacts = await Contact.find();
      res.json(contacts);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = { authDelete, getContacts, contactsAuth, getContactsAuth };