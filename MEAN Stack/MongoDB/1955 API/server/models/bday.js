const mongoose = require('mongoose');

const BdaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required']
    }
});

mongoose.model('Bday', BdaySchema);