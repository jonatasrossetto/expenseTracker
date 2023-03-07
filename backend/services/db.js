require('dotenv').config();
console.log('db.js running');


const Sequelize = require('sequelize');
//constructor(database: string, username: string, password: string, options: object)
const options = {
    dialect: 'mysql', 
    host: 'localhost', 
    logging: false
}; 

const sequelize = new Sequelize('booktracker_db','root',process.env.MYSQL_PASSWORD,options);


    // try {
    //     sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

module.exports = sequelize;