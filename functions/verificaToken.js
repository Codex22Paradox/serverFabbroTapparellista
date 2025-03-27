const verificaToken = (req, res, next, tokenConfig, jwt) => {
    const token = req.cookies.token; // Legge il token dal cookie
    if (!token) {
        return res.status(403).json({ message: "Token mancante" });
    }
    jwt.verify(token, tokenConfig, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token non valido" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verificaToken;
