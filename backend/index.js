require('dotenv').config(); //enviroment variables

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

initalizeDb();

const app = express();
app.use(cors());
app.use(express.json());

const authRoute = require('./routes/auth.js'); 
const signupRoute = require('./routes/signup.js');
const movimentsRoute = require('./routes/moviments.js');

app.use("/auth", authRoute);
app.use('/signup', signupRoute);
app.use('/moviments', movimentsRoute);

app.get('/', function(req, res) {
    res.send('Hello from index.js root route.');
  });

app.listen(8000);
console.log('Express started on port 8000');

function initalizeDb(){
  (async () => {
    console.log('inicializa o banco de dados')
    const database = require('./services/db');  
      const user = require('./models/userModel.js');
      const moviment = require('./models/movimentModel.js')
    try {
        const resultado = await database.sync();
        // console.log(resultado);
    } catch (error) {
        console.log(error);
    }
  })();
}