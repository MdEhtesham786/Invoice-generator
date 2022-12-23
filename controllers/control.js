const { Invoice, Register } = require('../models/product');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
//Get
const homePage = async (req, res) => {
    try {
        if (res.authenticated) {
            const userEmail = res.userEmail;
            const Data = (await Invoice.find({ userEmail })).reverse();
            return res.render('home', { title: 'Home', data: Data });
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};

const generatePage = async (req, res) => {
    try {
        if (res.authenticated) {
            const token = req.cookies.jwt;
            if (token) {
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                const Users = await Register.findOne({ _id: verifyToken._id });
                if (Users) {
                    const username = Users.username;
                    res.render('generate', { title: 'Generate Invoice', username, layout: '../views/layouts/invoicveLayout.ejs' });

                } else {
                    console.log('User not found');
                    return res.redirect('/');
                }
            } else {
                console.log('Token not found');
                return res.redirect('/');
            }
        } else {
            console.log('Authentication failed');
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/home');

    }
};
const loginPage = async (req, res) => {
    try {
        if (res.authenticated) {
            return res.redirect('/home');
        } else {
            res.render('form', { title: 'Login', signupData: '', message: '', formType: 'login', layout: '../views/layouts/formLayout.ejs' });
        }
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const signUpPage = async (req, res) => {
    try {

        res.render('form', { title: 'Login', message: '', formType: 'signup', layout: '../views/layouts/formLayout.ejs' });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};
const forgotPage = async (req, res) => {
    try {
        res.render('form', { title: 'Forgot', formType: 'forgot', layout: '../views/layouts/formLayout.ejs' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const searchedInvoice = async (req, res) => {
    try {
        if (res.authenticated) {
            const token = req.cookies.jwt;
            if (token) {
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                const Users = await Register.findOne({ _id: verifyToken._id });
                if (Users) {
                    const username = Users.username;
                    const { id: _id } = req.params;
                    const result = await Invoice.findOne({ _id });
                    res.render('searchedInvoice', { title: 'Searched Invoice', username, data: result, layout: '../views/layouts/invoicveLayout.ejs' });
                } else {
                    console.log('User not found');
                    return res.redirect('/');
                }
            } else {
                console.log('Token not found');
                return res.redirect('/');
            }

        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/home');

    }
};
const static = async (req, res) => {
    try {
        if (res.authenticated) {
            const Data = await Invoice.find();
            res.json({ Data });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};
const logout = async (req, res) => {
    try {
        if (res.authenticated) {
            res.users.tokens = res.users.tokens.filter((currToken) => {
                return currToken.token !== res.token;
            });
            await res.users.save();
            res.clearCookie('jwt');
            console.log('Logout successfully');
            return res.redirect('/');
        } else {
            console.log('Cookie not found');
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
//Post
const downloadPdf = async (req, res) => {
    try {
        // console.log(req.body);
        const token = req.cookies.jwt;
        if (token) {
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const Users = await Register.findOne({ _id: verifyToken._id });
            if (Users) {
                const username = Users.username;
                const clientInvoice = new Invoice(req.body);
                clientInvoice.userEmail = Users.email;
                await clientInvoice.save();
                console.log('Added');
                res.render('invoice', { title: 'Result', username, data: req.body, layout: '../views/layouts/invoicveLayout.ejs' });
            } else {
                console.log('User not found');
                return res.redirect('/');
            }
        } else {
            console.log('Token not found');
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);

    }
};
const login = async (req, res) => {
    try {
        const { remember, email, password } = req.body;
        const Users = await Register.findOne({ email });
        if (Users === null) {
            console.log('User not found');
            return res.render('form', { formType: 'login', signupData: '', message: 'User not found', layout: '../views/layouts/formLayout.ejs' });
        } else {
            const Comparing = await bcrypt.compare(password, Users.password);
            if (Comparing) {
                console.log('logged in successfully');
                const token = await Users.generateToken();
                if (remember) {

                    res.cookie('jwt', token, { expires: new Date(Date.now() + 36500000000) });
                } else {
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 604800000) });
                }
                res.redirect('/home');
            } else {
                console.log('Incorrect password');
                return res.render('form', { message: 'Incorrect password', signupData: '', formType: 'login', layout: '../views/layouts/formLayout.ejs' });

            }
        }

    } catch (err) {
        console.log(err);
    }
};
const signup = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body;
        const Users = await Register.findOne({ email });
        if (Users != null) {
            if (Users?.email === email) {
                console.log('Email already taken');
                return res.render('form', { formType: 'signup', layout: '../views/layouts/formLayout.ejs', message: 'Email has already been taken' });
            }
        } else {
            if (password !== confirm_password) {
                console.log('password and confirm password are not same');
                return res.render('form', { formType: 'signup', layout: '../views/layouts/formLayout.ejs', message: 'Password and Confirm password are not same' });
            } else {
                const clientData = new Register(req.body);
                await clientData.save();
                console.log('Saved');
                res.render('form', { formType: 'login', signupData: { email, password }, message: '', layout: '../views/layouts/formLayout.ejs' });

            }
        }

    } catch (err) {
        console.log(err);


    }
};





module.exports = { homePage, downloadPdf, searchedInvoice, generatePage, static, loginPage, signUpPage, forgotPage, login, signup, logout };