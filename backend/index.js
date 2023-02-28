require('dotenv').config(); //enviroment variables

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth.js'));

app.get('/', function(req, res) {
    res.send('Hello from index.js root route.');
  });

app.listen(8000);
console.log('Express started on port 8000');