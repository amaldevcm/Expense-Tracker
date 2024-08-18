const mongoose = require('mongoose');

const url = 'mongodb+srv://amald1101:AmalDev%40123@cluster0.d41ro.mongodb.net/ExpenseTracker';
// const url = 'mongodb://127.0.0.1:27017/ExpenseTracker';
const db = mongoose.connect(url)
                    .then(() => console.log('Database Connected!!!'))
                    .catch(err => console.log(err));


module.exports = db;