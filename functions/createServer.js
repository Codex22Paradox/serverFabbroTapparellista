const express = require('express');
const path = require('path');
const fs = require("fs");
const createServer = (port = JSON.parse(fs.readFileSync('./assets/conf.json')).port, configurazioniAggiuntive) =>{
    const app = express();
    configurazioniAggiuntive(app, express, path);
    app.listen(port, () => {
        console.log('Server is running http://localhost:'+port);
    });
    return app; // Restituisci l'oggetto server come 'server' e il modulo path
}

module.exports = createServer;