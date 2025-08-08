const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();
const url = encodeURI(process.env.DB_URL);
const db = mongoose.connect(url)
    .then(() => console.log('Database Connected!!!'))
    .catch(err => console.log(err));


module.exports = db;