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
    place: {
        type: String,
        required: false
    },
    eWayBillNo: {
        type: Number,
        required: false
    },
    billToParty: {
        type: String,
        required: false
    },
    consignee: {
        type: String,
        required: false
    },
    partyPan: {
        type: String,
        required: false
    },
    consigneePan: {
        type: String,
        required: false
    },
    partyGstinNo: {
        type: String,
        required: false
    },
    consigneeGstinNo: {
        type: String,
        required: false
    },
    partyState: {
        type: String,
        required: false
    },
    partyStateCode: {
        type: Number,
        required: false
    },
    consigneeState: {
        type: String,
        required: false
    },
    consigneeStateCode: {
        type: Number,
        required: false
    },
    productDescription: {
        type: String,
        required: false
    },
    hsnCode: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    rate: {
        type: Number,
        required: false
    },
    amount: {
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
    },
    bankName: {
        type: String,
        required: false
    },
    accountNo: {
        type: Number,
        required: false
    },
    ifscCode: {
        type: String,
        required: false
    },
    branch: {
        type: String,
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