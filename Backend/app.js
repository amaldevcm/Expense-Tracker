const express = require('express');
const mongoose = require('./Database/DB');
const cors = require('cors');
const moment = require('moment');
const dotenv = require('dotenv');
const db = require('./Database/expense_schema');

dotenv.config();
const app = express();
app.use(express.json());                //To process json data
app.use(cors());                        //To support cross-origin resource sharing
const port = process.env.PORT || 3000;  //To use environment variable as port number

// Getting all records
app.get('/api/expenses', (req, res) => {
    db.find().then((result) => {
        res.send({ 'expenses': result });
    }).catch(err => {
        console.log(err);
        res.status(400).send({ 'error': err });
    });
});

// Adding new record
app.post('/api/newExpense', (req, res) => {
    let data = req.body;
    data.createdDate = moment().startOf('day').toISOString();

    const expense = new db(data);
    expense.save().then(() => res.status(201).send({ result: 'Success', msg: 'Expense added successfully' }))
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'error': err });
        });
});


// Update existing record
app.put('/api/updateExpense', (req, res) => {
    let data = req.body;
    const expenseId = req.query.id;

    db.findOneAndUpdate({ expense_id: expenseId }, data)
        .then(() => res.send({ result: 'Success', msg: 'Expense added successfully' }))
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'error': err });
        });
});

app.listen(port, () => console.log('Listening to port ' + port));
