require('dotenv').config(); //enviroment variables

const database = require('../services/db.js');
const User = require('../models/userModel.js');

const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = express.Router();
signup.use(cors());
signup.use(express.json());

// //starts the database connection
// ( async() =>{ 
//     resultado = await database.sync(); 
//     console.log(resultado)
// });

signup.get('/',(req,res)=>{
    console.log('signup!!')
    res.send('Signup route is working fine!!');
})

signup.post('/adduser',(req,res)=>{
    console.log('/adduser running')
    console.log('req.body.email: '+req.body.email);
    console.log('req.body.password: '+req.body.password);
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    isEmailUnique(userData.email).then(response => {
        console.log('response: '+response);
        if (response) {
            addUser(userData).then(response => {
                console.log('addUser finished');
                res.send({message:'adduser received the data you have sent'});
            })
        } else {
            res.send({message:'email already signed up'});
        }
    })
     
        
    
    
})

async function addUser(userData){
    try {
        console.log('trying to add a new user' );
        isEmailUnique(userData.email);
        const hashPassword = await bcrypt.hash(userData.password, 10);
        const resultadoCreate = await User.create({
                email: userData.email,
                password: hashPassword
            });
        } catch (error) {
            console.log(error);
        }
}

async function isEmailUnique (testEmail) {
    resultado = await User.findOne({ where: { email: testEmail } }).then(token => token == null).then(isUnique => isUnique);
    console.log('isEmailUnique: '+resultado);
    return resultado;
}

module.exports = signup;