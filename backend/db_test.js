
(async () => {
    const database = require('./db.js');
    const User = require('./userModel.js');
    const Moviment = require("./movimentModel.js");
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();
