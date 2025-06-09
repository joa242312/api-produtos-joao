const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();
const byscrpt = require('bcrypt');

async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(401).send({
                error: "Usuario não encontrado"
            })
        }
        const match = await byscrpt.compare(password, user.password)
        if (!match) {
            return res.status(401).send({
                error: "Senha incorreta"
            })
        }
        const token = jwt.sign(
            { id: user.id, email: email.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
        return res.send({
            token
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}
module.exports = {
    Login
}