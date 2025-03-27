const jwt = require("jsonwebtoken");
const login = (request, response) =>{
    const { username, password } = request.body;
    const validUser = (username === "Luciano" && password === "lcserrature") ||
        (username === "Elio" && password === "eliomultiservice");
    if (!validUser) return response.status(401).json({ message: "Credenziali non valide" });
    const token = jwt.sign({ id: username }, tokenConfig.secret, {
        expiresIn: 2 * 60 * 60 // 2 ore
    });
    response.cookie("token", token, {
        httpOnly: true,  // Impedisce accesso da JavaScript
        secure: false,    // Richiede HTTPS
        sameSite: "Strict",
        maxAge: 2 * 60 * 60 * 1000 // 2 ore
    });
    response.json({ result: true });
}

module.exports = login;