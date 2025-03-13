const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {//endpoint
   res.send('Hello World!');
});

app.get('/a', (req, res) => {//endpoint
   res.send('route a!');
});

app.get('/b', (req, res) => {//endpoint
   res.send('route b!');
});

app.get('/c', reqCallback);

app.get('/d', reqCallbackD);


function reqCallback(req, res) {
   res.send('Route C!');
}

function reqCallbackD(req, res) {
   res.send('Route D!');
}

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});