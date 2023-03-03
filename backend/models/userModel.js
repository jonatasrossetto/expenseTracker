const Sequelize = require('sequelize');
const database = require('../services/db.js');

console.log('userModel running');

const user = database.define('user',{
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = user;