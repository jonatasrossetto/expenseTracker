require('dotenv').config(); //enviroment variables

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const dados = [
    {
        username: "joao",
        text: "post 1"
    },
    {
        username: "maria",
        text: "post 1"
    },
    {
        username: "joao",
        text: "post 2"
    }
]

app.get('/posts',authenticateToken,(req,res)=>{
    res.json(dados.filter(dado => dado.username===req.user.name));
})

app.post('/login',(req,res)=>{
    // AUTHENTICATE THE USER WITHIN DB
    console.log('/login');
    const username = req.body.username;
    const payload = { name: username };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    console.log('access token: '+accessToken);
    res.json(accessToken);
})

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // returns undefined if authHeader does not exists
    console.log(token);
    if (token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(3000);