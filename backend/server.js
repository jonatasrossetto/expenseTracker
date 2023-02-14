require('dotenv').config(); //enviroment variables

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dados = [
    {rowId: 1, userId:'1', data: '2023-01-02', descricao: 'teste', categoria: 'mercado', tipo: 'saida', valor: '123'},
    {rowId: 2, userId:'1', data: '2023-01-03', descricao: 'teste', categoria: 'carro', tipo: 'saida', valor: '234'},
    {rowId: 3, userId:'1', data: '2023-01-04', descricao: 'teste', categoria: 'extra', tipo: 'saida', valor: '345'},
    {rowId: 4, userId:'1', data: '2023-01-05', descricao: 'teste', categoria: 'educação', tipo: 'saida', valor: '456'},
    {rowId: 5, userId:'2', data: '2023-01-06', descricao: 'teste', categoria: 'mercado', tipo: 'saida', valor: '567'},
    {rowId: 6, userId:'2', data: '2023-01-07', descricao: 'teste', categoria: 'carro', tipo: 'saida', valor: '789'},
    {rowId: 7, userId:'2', data: '2023-01-08', descricao: 'teste', categoria: 'extra', tipo: 'saida', valor: '891'},
    {rowId: 8, userId:'3', data: '2023-01-09', descricao: 'teste', categoria: 'educação', tipo: 'saida', valor: '912'},
    {rowId: 9, userId:'3', data: '2023-01-10', descricao: 'teste', categoria: 'mercado', tipo: 'saida', valor: '123'},
    {rowId: 10, userId:'4', data: '2023-01-11', descricao: 'teste', categoria: 'carro', tipo: 'saida', valor: '234'},
    {rowId: 11, userId:'4', data: '2023-01-12', descricao: 'teste', categoria: 'extra', tipo: 'saida', valor: '345'},
]

const DBmovimentacao = [{
    id: String,
    data: String,
    descricao: String,
    categoria: String,
    tipo: String,
    valor: String
}]

app.get('/posts',authenticateToken,(req,res)=>{
    console.log('posts');
    res.json(dados.filter(dado => dado.userId===req.user.id));
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
    console.log('authHeader: '+authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // returns undefined if authHeader does not exists
    console.log('token: '+token);
    if (token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403);
        console.log('username: '+user.name+' userId: '+user.id);
        req.user = user;
        next();
    })
}

app.listen(3000);