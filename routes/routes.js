const express = require('express');
const { downloadPdf, homePage, searchedInvoice, generatePage, static, loginPage, signUpPage, forgotPage, login, signup, logout } = require('../controllers/control');
const router = express.Router();
const auth = require('../auth/auth');

//Get
router.get('/', auth, loginPage);
router.get('/signup', signUpPage);
router.get('/forgot', forgotPage);
router.get('/home', auth, homePage);
router.get('/generate', auth, generatePage);
router.get('/home/:id', auth, searchedInvoice);
router.get('/logout', auth, logout);
router.get('/static', auth, static);
//Post
router.post('/download', downloadPdf);
router.post('/', login);
router.post('/signup', signup);
module.exports = router;