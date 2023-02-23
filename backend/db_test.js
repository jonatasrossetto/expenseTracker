
(async () => {
    const database = require('./db.js');
    const User = require('./userModel.js');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();
