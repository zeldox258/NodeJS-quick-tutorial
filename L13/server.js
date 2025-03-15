const express = require('express');
require('dotenv').config();
const logger = require('pino-http')
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routers/userRoute');
const entryRoute = require('./routers/entryRoute');
const commentRoutes = require('./routers/commentRoutes');
const uploadRoute = require('./routers/uploadRoute');
const { swaggerUi, swaggerDocs } = require("./swagger");

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', userRoute);
app.use('/entry', entryRoute);
app.use('/comment', commentRoutes);
app.use('/upload', uploadRoute);

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
   console.log("Swagger docs available at http://localhost:3000/api-docs");
   
   connectDb();

});