const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const contacts = [
   {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
   }
];

app.get('/', (req, res) => {//endpoint
   res.send('Hello World this is lecture 2!');
});

app.post('/', (req, res) => {
   res.send('Post request to the homepage');
});

// GET POST PUT DELETE

//GET
app.get('/contacts', (req, res) => {
   console.log('Contacts:', contacts);
   res.json(contacts);
});

//POST
app.post('/contacts', (req, res) => {
   const contact = req.body;
   contact.id = contacts.length + 1;

   //check if the contact email already exists
   const emailExists = contacts.find(c => c.email === contact.email);
   if (emailExists) {
      return res.status(400).send('Email already exists');
   }

   contacts.push(contact);

   console.log('Contact added:', contact);

   res.json(contact);
});

app.get('/contacts/:id', (req, res) => {
   const id = req.params.id;
   const contact = contacts.find(contact => contact.id == id);

   if (!contact) {
      res.status(404).send('Contact not found');
   }

   console.log('Contact found:', contact);
   res.json(contact);
});

app.put('/contacts/:id', (req, res) => {
   const id = req.params.id;
   const contact = contacts.find(contact => contact.id == id);

   if (!contact) {
      res.status(404).send('Contact not found');
   }

   //check if the contact email already exist other than the current contact
   const emailExists = contacts.find(c => c.email === req.body.email && c.id != id);
   if (emailExists) {
      return res.status(400).send('Email already exists');
   }

   const newContact = req.body;
   newContact.id = contact.id;

   contacts[contacts.indexOf(contact)] = newContact;

   console.log('Old contact:', contact);
   console.log('New contact:', newContact);


   res.json(newContact);
});

app.delete('/contacts/:id', (req, res) => {
   const id = req.params.id;
   const contact = contacts.find(contact => contact.id == id);

   if (!contact) {
      res.status(404).send('Contact not found');
   }

   contacts.splice(contacts.indexOf(contact), 1);
   console.log('Contact deleted:', contact);

   res.json(contact);
});


app.post('/bmicalculator', (req, res) => {
   const { weight, height } = req.body;
   //body value control
   if (!weight || !height) {
      return res.status(400).send('Weight and height are required');
   }
   //must be positive
   if (weight <= 0 || height <= 0) {
      return res.status(400).send('Weight and height must be positive');
   }

   const bmi = weight / (height * height);

   const bmiText = bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal' : bmi < 29.9 ? 'Overweight' : 'Obese';

   res.json({ bmi, bmiText });
});



app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});