const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BikeSchema = new mongoose.Schema({
    _creator: {
        type: Number,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

mongoose.model("Bike", BikeSchema);
