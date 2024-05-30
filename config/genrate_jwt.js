const jwt = require("jsonwebtoken")

const generateToken = (id) =>{
    var token = jwt.sign({ id }, process.env.JWT_SECRETE, {expiresIn: "3d" });
    return token
}

module.exports = { generateToken };