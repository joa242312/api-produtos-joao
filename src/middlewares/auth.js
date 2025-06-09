const jwt = require('jsonwebtoken');
require('dotenv').config();
function ValidateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            error: 'Token não fornecido'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch (error) {
        return res.send(401).send({
            error: "tokem ivalido"
        })
    }

}
module.exports ={
    ValidateToken
}