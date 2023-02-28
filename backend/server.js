require('dotenv').config(); //enviroment variables

const database = require('./db');
const Moviment = require("./movimentModel.js");

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//starts the database connection
( async() =>{ resultado = await database.sync() });

let dados = [
    {rowId: 1, userId:'1', date: '2023-01-02', descricao: 'teste', categoria: 'mercado', tipo: 'saida', valor: '123'},
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

let DBmovimentacao = [{
    id: String,
    data: String,
    descricao: String,
    categoria: String,
    tipo: String,
    valor: String
}]

app.get('/posts',authenticateToken,(req,res)=>{
    console.log('posts');
    res.json(dados.filter(dado => dado.userId===req.user.userId));
})

app.post('/addMovimentacao',authenticateToken,(req,res)=>{
    let nextRowId = dados[dados.length-1].rowId+1;
    console.log('/addMovimentacao')
    // console.log('userId: '+req.user.id);
    // console.log('data: '+req.body.data);
    // console.log('descrição: '+req.body.descricao);
    // console.log('categoria: '+req.body.categoria);
    // console.log('tipo: '+req.body.tipo);
    // console.log('valor: '+req.body.valor);
    // console.log('nextRowId: '+nextRowId);
    const mov = {
        userId:req.user.id,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        value: req.body.value
        };
    
    console.log('*** antes');
    writeMoviment(mov).then(resWrite => {
        readMoviments(mov.userId).then(resRead =>{
            res.send(resRead);
            console.log('*** depois');
        });
    });
    
    // const leituras = readMoviments(mov.userId);
    
    // console.log('leituras:'+leituras);

    
    dados.push(
        {   rowId: nextRowId, 
            userId:req.user.userId,
            date: req.body.date,
            description: req.body.description,
            category: req.body.category,
            type: req.body.type,
            value: req.body.value
        }
    );

    // res.send(
    //     JSON.stringify(
    //         dados.filter(dado => dado.userId===req.user.id)
    //     ));
        
})

app.post('/deleteMovimentacao',authenticateToken,(req,res)=>{
    console.log('/deleteMovimentacao')
    console.log('RowId: '+req.body.rowId);
    let index = dados.findIndex(dado => dado.rowId===req.body.rowId);
    console.log('index: '+index);
    dados.splice(index,1);
    
    res.send(
        JSON.stringify(
            dados.filter(dado => dado.userId===req.user.id)
        ));
        // res.send(JSON.stringify({message:"delete request received"}));
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

async function writeMoviment(mov){
        const start = Date.now();
        
        try {
            console.log('**************************************');
            console.log('tentando a escrita');  
            
            resultadoCreate = await Moviment.create({
                userId: mov.userId,
                date: mov.date,
                description:mov.description,
                category: mov.category,
                type: mov.type,
                value: mov.value
            });
            console.log('**************************************');
            const end = Date.now();
            return 'hi there writing finished in '+(end-start)+' miliseconds';
        } catch (error) {
            console.log(error);
        }
    ;
}

async function readMoviments(userId){
    const start = Date.now();    
    try {
            console.log('**************************************');
            console.log('tentando a leitura');
            console.log('**************************************');
            const resultadoLeitura = await Moviment.findAll({
                where: {
                    userId: userId
                }
            });
            const end = Date.now();
            console.log('read resolved in: '+(end-start)+'miliseconds');
            return JSON.stringify(resultadoLeitura);
        } catch (error) {
            console.log(error);
        }
}

app.listen(3000);