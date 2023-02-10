require('dotenv').config(); //enviroment variables

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
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

const DBmovimentacao = [{
    data: String,
    descricao: String,
    categoria: String,
    tipo: String,
    valor: String
}]

app.get('/posts',authenticateToken,(req,res)=>{
    console.log('posts');
    res.json(dados.filter(dado => dado.username===req.user.name));
})

app.post('/addMovimentacao',authenticateToken,(req,res)=>{
    console.log(req.body);
    DBmovimentacao.push(req.body);
    res.send(JSON.stringify(DBmovimentacao));
})

function authenticateToken (req, res, next) {
    console.log('begin authenticateToken');
    if (!req.headers.authorization) {
        console.log('no authentication header provided');
        console.log('end authenticate token');
        return res.sendStatus(403);
    }
    const authHeader = JSON.parse(req.headers.authorization).token;
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