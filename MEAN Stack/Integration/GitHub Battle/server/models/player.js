const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

mongoose.model("Player", PlayerSchema);
