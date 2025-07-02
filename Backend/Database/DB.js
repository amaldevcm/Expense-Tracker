const mongoose = require('mongoose');

const url = 'your DB URL';
// const url = 'mongodb://127.0.0.1:27017/ExpenseTracker';
const db = mongoose.connect(url)
                    .then(() => console.log('Database Connected!!!'))
                    .catch(err => console.log(err));


module.exports = db;
