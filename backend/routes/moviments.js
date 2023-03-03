require('dotenv').config(); //enviroment variables

const database = require('../services/db');
const Moviment = require("../models/movimentModel.js");

const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const moviments = express.Router();
moviments.use(cors());
moviments.use(express.json());

moviments.get('/',(req,res)=>{
    console.log('moviments/');
    res.send('moviments route working fine!');
})

moviments.get('/posts',authenticateToken,(req,res)=>{
    console.log('/posts');
    readMoviments(req.user.id).then(resRead =>{
        res.send(resRead);
        console.log('*** depois');
    })
})

moviments.post('/addMovimentacao',authenticateToken,(req,res)=>{
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
    
    writeMoviment(mov).then(resWrite => {
        readMoviments(mov.userId).then(resRead =>{
            res.send(resRead);
        });
    });
    
})

moviments.post('/deleteMovimentacao',authenticateToken,(req,res)=>{
    console.log('/deleteMovimentacao')
    console.log('movId: '+req.body.movId);
    deleteMoviment(req.body.movId).then(resDelete =>{
        readMoviments(req.user.id).then(resRead =>{
            res.send(resRead);
        });
    })
    
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
    try {
        console.log('writeMoviment mov.userId:'+mov.userId);
        resultadoCreate = await Moviment.create({
                userId: mov.userId,
                date: mov.date,
                description:mov.description,
                category: mov.category,
                type: mov.type,
                value: mov.value
            });
            return 'writeMoviment ok';
        } catch (error) {
            console.log(error);
        }
    ;
}

async function readMoviments(userId){
    try {
            console.log('readMoviments userId:'+userId);
            const resultadoLeitura = await Moviment.findAll({
                where: {
                    userId: userId
                }
            });
            return JSON.stringify(resultadoLeitura);
        } catch (error) {
            console.log(error);
        }
}

async function deleteMoviment(id){
    try {
        console.log('deletMoviment movId:'+id)
        const resultado = await Moviment.destroy({
            where: {
                movId: id
            }
        });
        return JSON.stringify(resultado);
    } catch (error) {
        console.log(error);
    }
}

module.exports = moviments;