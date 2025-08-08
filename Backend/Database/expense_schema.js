const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        default: '',
        required: false
    },
    amount: Number,
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    exchangeRate: Number,
    paymentType: {
        type: String,
        default: 'cash',
        required: true
    },
    createdDate: Date
});

const expenseModel = mongoose.model('Expense', expenseSchema);
module.exports = expenseModel;