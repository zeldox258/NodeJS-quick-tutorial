const express = require('express');
require('dotenv').config();
const logger = require('pino-http')
const mongoose = require('mongoose');

const contactRoutes = require('./routers/contactRoutes');
//const addressRoutes = require('./routers/addressRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger({
      transport: {
         target: 'pino-pretty',
         options: {
            colorize: true
         }
      }
   }
));


app.use('/', contactRoutes);

app.get('/', (req, res) => {
   res.send('Hello World this is lecture 3!');
});



const addressSchema = new mongoose.Schema({
   street: {type:String, required:true},
   city: String,
   zip: String
});

const Address = mongoose.model('Address', addressSchema);

app.get('/address', async (req, res) => {
   const addresses = await Address.find();
   res.json(addresses);
});

app.post('/address', async (req, res) => {
   const address = new Address(req.body);
   await address.save();

   res.json(address);
});

app.post('/contacts', async (req, res) => {
   try {
      const contact = new Contact(req.body);
      let response = await contact.save();
      res.json({response, contact});
   } catch (error) {
      res.status(500).json({error: error.message});
   }
});

app.get('/contacts/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const contact = await Contact.findById(id);

      if (!contact) {
         return res.status(404).send('Contact not found');
      }

      res.json(contact);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

app.get('/contactswithfind/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const contact = await Contact.find({ _id: id });

      if (!contact) {
         return res.status(404).send('Contact not found');
      }

      res.json(contact);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

app.get('/contact/:name', async (req, res) => {
   try {
      const name = req.params.name;
      const contact = await Contact.find({ name: { $regex: name, $options: 'i' } });

      if (!contact) {
         return res.status(404).send('Contact not found');
      }

      res.json(contact);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

//update ve delete

app.put('/contacts/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

      if (!contact) {
         return res.status(404).send('Contact not found');
      }
      res.json(contact);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});


app.delete('/contacts/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
         return res.status(404).send('Contact not found');
      }
      res.json(contact);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});





app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
   mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

});