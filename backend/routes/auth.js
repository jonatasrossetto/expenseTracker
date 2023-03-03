require('dotenv').config(); //enviroment variables

const database = require('../services/db.js');
const User = require('../models/userModel.js');

const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = express.Router();
auth.use(cors());
auth.use(express.json());

//fake database to store users
let users = [
    {   username: 'joao',
        password: '123',
        userId: '1' 
    },
    {   username: 'maria',
        password: '123',
        userId: '2' 
    },
    {   username: 'paulo',
        password: '123',
        userId: '3'
    },
    {   username: 'clara',
        password: '123',
        userId: '4' 
    }
];

//fake database to store refresh tokens
let refreshTokens = [];

auth.get('/',(req,res)=>{
    console.log('/auth working fine!!');
    res.send('/auth working fine!!');
})

auth.post('/login',(req,res)=>{
    console.log('auth/login');
    if (!req.headers.authorization) return res.status(401).send('No authorization data provided');
    
    validateLoginDB(
        JSON.parse(req.headers.authorization).username,
        JSON.parse(req.headers.authorization).password
        ).then(response => console.log('validateLoginDB: '+JSON.stringify(response)));

    // AUTHENTICATE THE USER WITHIN DB
    const validateLoginResponse = validateLogin(
            JSON.parse(req.headers.authorization).username,
            JSON.parse(req.headers.authorization).password
        );
    if (!validateLoginResponse) {
        return res.sendStatus(401).send('No authorization data provided');
    }
    
    const payload = validateLoginResponse;
    // console.log('username: '+payload.name+' userId: '+payload.id);
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    console.log('access token: '+accessToken);
    console.log('refresh token: '+refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

auth.post('/token',(req,res)=>{
    const refreshToken = req.body.token;
    if (refreshToken==null) return res.sendStatus(401); //401 Unauthorized
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) //403 Forbidden
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403); //403 Forbidden
        const accessToken = generateAccessToken( {name: user.name });
        res.json({accessToken: accessToken})
    })
})

auth.delete('/logout',(req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})


function generateAccessToken(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10min'});
}

function validateLogin(username, password){
//using fake DB    
    const userData = users.find(user => (user.username === username)&&(user.password===password));
    
    if (userData) {
        console.log('username: '+userData.username+' userId: '+userData.userId);
        return { name: userData.username, id:userData.userId };
    } else {
        return null;
    }
    

}

async function validateLoginDB(username, password){
    //using sequelize and mysql DB
    try {
        console.log('login finding username in DB')
        const resultado = await User.findAll({
            where: {
                email: username
            }
        });
        console.log('login resultado: '+resultado.email);
        return resultado;
    } catch(error) {
        console.log(error);
    }
}


module.exports = auth;