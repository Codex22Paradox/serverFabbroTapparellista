const fs = require('fs');
const tokenConfig = JSON.parse(fs.readFileSync('./assets/conf.json')).token;
const verificaToken = require("./functions/verificaToken");
const session = require('express-session');
const createServer = require("./functions/createServer");
const ottieniImmaginiFabbro = require("./functions/ottieniImmaginiFabbro")
const ottieniImmaginiTapparellista = require("./functions/ottieniImmaginiTapparellista")
const ottieniTutteImmagini = require("./functions/ottieniTutteImmagini")
const salvaImmagine = require("./functions/salvaImmagine")
const logout = require("./functions/logout")
const login = require("./functions/login")


const configurazioniAggiuntive = (app,express,path) =>{
    app.use(express.json({limit: "50mb"}));
    app.use(express.static(path.join(__dirname, 'public/')));
    app.use(session({
        secret: tokenConfig, resave: false, saveUninitialized: true, cookie: {maxAge: 2 * 60 * 60} // 2 ore
    }));
}
const server = createServer(undefined, configurazioniAggiuntive);
server.post("/login", login);
server.post("/logout", verificaToken, logout);
server.post("/salvaImmagine", verificaToken, salvaImmagine);
server.get('/immagini/fabbro', verificaToken, ottieniImmaginiFabbro);
server.get('/immagini/tapparellista', verificaToken, ottieniImmaginiTapparellista);
server.get('/immagini/ottieniTutteImmagini', verificaToken, ottieniTutteImmagini);