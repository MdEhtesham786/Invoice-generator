const jwt = require('jsonwebtoken');
const { Register } = require('../models/product');
require('dotenv').config();
const auth = async (req, res, next) => {
    try {

        let authenticated = false;
        const token = req.cookies.jwt;
        if (token) {
            const verify = jwt.verify(token, process.env.SECRET_KEY);
            if (verify) {
                const Users = await Register.findOne({ _id: verify._id });
                if (Users) {
                    res.users = Users;
                    res.userEmail = Users.email;
                    res.token = token;
                    authenticated = true;
                }
            }
        }
        res.authenticated = authenticated;
        next();

    } catch (err) {
        console.log(err);

    }
};
module.exports = auth;