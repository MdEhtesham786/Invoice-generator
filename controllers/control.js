const { Invoice, Register } = require('../models/product');
const bcrypt = require('bcrypt');
//Get
const homePage = async (req, res) => {
    try {
        if (res.authenticated) {
            const Data = (await Invoice.find()).reverse();
            return res.render('home', { title: 'Home', data: Data });
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);

    }
};

const generatePage = async (req, res) => {
    try {
        if (res.authenticated) {
            res.render('generate', { title: 'Generate Invoice', layout: '../views/layouts/invoicveLayout.ejs' });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);

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

    }
};
const signUpPage = async (req, res) => {
    try {

        res.render('form', { title: 'Login', message: '', formType: 'signup', layout: '../views/layouts/formLayout.ejs' });
    } catch (err) {
        console.log(err);

    }
};
const forgotPage = async (req, res) => {
    try {
        res.render('form', { title: 'Forgot', formType: 'forgot', layout: '../views/layouts/formLayout.ejs' });
    } catch (err) {
        console.log(err);

    }
};
const searchedInvoice = async (req, res) => {
    try {
        if (res.authenticated) {
            const { id: _id } = req.params;
            const result = await Invoice.findOne({ _id });
            res.render('searchedInvoice', { title: 'Searched Invoice', data: result, layout: '../views/layouts/invoicveLayout.ejs' });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);

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

    }
};
//Post
const downloadPdf = async (req, res) => {
    try {
        console.log(req.body);
        const clientInvoice = new Invoice(req.body);
        await clientInvoice.save();
        console.log('Added');
        res.render('invoice', { title: 'Result', data: req.body, layout: '../views/layouts/invoicveLayout.ejs' });
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