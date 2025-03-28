const express = require('express');
require('dotenv').config();
const logger = require('pino-http')
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routers/userRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger());
app.use(cors());


app.use('/auth', userRoute);

let connectDb = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
   } catch (error) {
      console.log(error);
   }
};

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
   connectDb();

});