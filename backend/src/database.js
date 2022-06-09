const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nicoquizapp', {
})
    .then(_db => console.log('Database is connected'))
    .catch(err => console.log(err));