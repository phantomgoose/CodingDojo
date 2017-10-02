const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: {
                    isAsync: true,
                    validator: (email, cb) => {
                        let User = mongoose.model("User");
                        User.find({ email: email }, (err, users) => {
                            cb(users.length === 0);
                        });
                    },
                    message: "A user with this email already exists!"
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        listings: [{ type: Schema.Types.ObjectId, ref: "Bike" }]
    },
    { timestamps: true }
);

UserSchema.pre("save", function(next) {
    let doc = this;
    bcrypt.hash(doc.password, 10, (err, hashed_pw) => {
        if (err) {
            next(err);
        } else {
            doc.password = hashed_pw;
            next();
        }
    });
});

mongoose.model("User", UserSchema);
