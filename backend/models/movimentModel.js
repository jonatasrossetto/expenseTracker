const Sequelize = require('sequelize');
const database = require('../services/db.js');

const moviment = database.define('moviment',{
    movId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
    
});

module.exports = moviment;