const mongoose = require('mongoose');

const RabbitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A rabbit name is required"]
        },
        color: {
            type: String,
            required: [true, "Fur color is required"]
        },
        pic: {
            type: String,
            required: [true, "Picture url must be provided"]
        }
    },
    { timestamps: true }
);

mongoose.model("Rabbit", RabbitSchema);