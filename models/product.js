const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const billSchema = new mongoose.Schema({
    invoiceNo: {
        type: String,
        required: false
    },
    invoiceDate: {
        type: String,
        required: false
    },
    reverseCGS: {
        type: String,
        required: false
    },
    transport: {
        type: String,
        required: false
    },
    vehicleNo: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    eWayBillNo: {
        type: Number,
        required: false
    },
    billToPartyName: {
        type: String,
        required: false
    },
    billToPartyAddress: {
        type: String,
        required: false
    },

    PAN: {
        type: String,
        required: false
    },

    GSTIN: {
        type: String,
        required: false
    },
    productOne: {
        type: String,
        required: false
    },
    productTwo: {
        type: String,
        required: false
    },
    productThree: {
        type: String,
        required: false
    },
    hsnCodeOne: {
        type: Number,
        required: false
    },
    hsnCodeTwo: {
        type: Number,
        required: false
    },
    hsnCodeThree: {
        type: Number,
        required: false
    },
    quantityOne: {
        type: Number,
        required: false
    },
    quantityTwo: {
        type: Number,
        required: false
    },
    quantityThree: {
        type: Number,
        required: false
    },
    rateOne: {
        type: Number,
        required: false
    },
    rateTwo: {
        type: Number,
        required: false
    },
    rateThree: {
        type: Number,
        required: false
    },
    amountOne: {
        type: Number,
        required: false
    },
    amountTwo: {
        type: Number,
        required: false
    },
    amountThree: {
        type: Number,
        required: false
    },
    amountBeforeTax: {
        type: Number,
        required: false
    },
    cgst: {
        type: Number,
        required: false
    },
    sgst: {
        type: Number,
        required: false
    },
    amountAfterTax: {
        type: Number,
        required: false
    }
},);
const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: false

    },
    tokens: [
        {
            token: {
                type: String,
                required: false
            }
        }
    ]
});

registerSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);

    }
};
//Hashing
registerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});
const Register = mongoose.model('user-credentials', registerSchema);
const Invoice = mongoose.model('all-invoice', billSchema);
module.exports = { Register, Invoice }; 