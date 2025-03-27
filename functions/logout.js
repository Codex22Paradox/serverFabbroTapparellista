const logout = (request, response) =>{
    response.clearCookie("token");
    response.json({result: true});
}
module.exports = logout;
