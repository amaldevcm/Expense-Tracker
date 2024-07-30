const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expense_id: Number,
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
        default: 'IND'
    },
    paymentType: {
        type: String,
        default: 'cash',
        required: true
    },
    createdDate: Date
});

const expenseModel = mongoose.model('Expense', expenseSchema);
module.exports = expenseModel;