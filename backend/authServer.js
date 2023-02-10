require('dotenv').config(); //enviroment variables

const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

//fake database to store users
let users = [
    {   username: 'joao',
        password: '123' 
    }
];

//fake database to store refresh tokens
let refreshTokens = [];

app.get('/users',(req,res)=>{
    console.log('get /users');
    res.send(users);
})

app.post('/users',async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPassword: '+hashedPassword);
        const user = { 
            username: req.body.username,
            password: hashedPassword
        }
        users.push(user);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
})

app.post('/login',(req,res)=>{
    // AUTHENTICATE THE USER WITHIN DB
    console.log('/login');
    if (!req.headers.authorization) return res.status(401).send('No authorization data provided');
    console.log('username: '+JSON.parse(req.headers.authorization).username);
    console.log('password: '+JSON.parse(req.headers.authorization).password);
    const username = JSON.parse(req.headers.authorization).username;
    const payload = { name: username };
    console.log('username: '+payload.name);
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    console.log('access token: '+accessToken);
    console.log('refresh token: '+refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

app.post('/token',(req,res)=>{
    const refreshToken = req.body.token;
    if (refreshToken==null) return res.sendStatus(401); //401 Unauthorized
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) //403 Forbidden
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403); //403 Forbidden
        const accessToken = generateAccessToken( {name: user.name });
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout',(req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})


function generateAccessToken(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10min'});
}

function validateLogin(authData){

}

app.listen(4000);