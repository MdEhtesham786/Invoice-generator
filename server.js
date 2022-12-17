const hostname = '127.0.0.1';
const port = 5000 || process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./db/connect');
const router = require('./routes/routes');
const { Invoice } = require('./models/product');
const { default: mongoose } = require('mongoose');
app.use('/static', express.static('static'));
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', './layouts/layout.ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//Router
app.use('/', router);

const deleteAll = async () => {
    try {
        // await Invoice.findOneAndDelete({});
        console.log('Removed');
    } catch (err) {
        console.log(err);

    }
};
// deleteAll();

//Start database and server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`This server is running on port http://${hostname}:${port}`);
        });
    } catch (err) {
        console.log(err);

    }
};
start();
