require('dotenv').config();


const Sequelize = require('sequelize');
//constructor(database: string, username: string, password: string, options: object)
const sequelize = new Sequelize('booktracker_db','root',process.env.MYSQL_PASSWORD,{dialect: 'mysql', host: 'localhost'});

    // try {
    //     sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

module.exports = sequelize;