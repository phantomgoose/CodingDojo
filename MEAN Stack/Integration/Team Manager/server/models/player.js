const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Player name is required"],
            minlength: [2, "Player name must be at least 2 characters long"]
        },
        position: {
            type: String
        },
        // you'd probably want a separate schema for games though with a one-to-one link to players. For the purposes of the exercise, i'm sticking with a single model.
        game1_status: {
            type: Number,
            validate: {
                validator: function(v) {
                    return [1, 2, 3].indexOf(v) > 0;
                },
                message: `{VALUE} is not a valid status`
            }
        },
        game2_status: {
            type: Number,
            validate: {
                validator: function(v) {
                    return [1, 2, 3].indexOf(v) > 0;
                },
                message: `{VALUE} is not a valid status`
            }
        },
        game3_status: {
            type: Number,
            validate: {
                validator: function(v) {
                    return [1, 2, 3].indexOf(v) > 0;
                },
                message: `{VALUE} is not a valid status`
            }
        }
    },
    { timestamps: true }
);

mongoose.model("Player", PlayerSchema);
