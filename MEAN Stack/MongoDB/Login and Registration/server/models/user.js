const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "You must provide a valid email in order to register"],
        validate: [
            {
                validator: email => {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        email
                    );
                },
                message: `{VALUE} is not a valid email.`
            },
            {
                isAsync: true,
                validator: (email, cb) => {
                    let User = mongoose.model("User");
                    User.find({ email: email }, (err, users) => {
                        cb(users.length === 0);
                    });
                },
                message: "A user with this email already exists!"
            }
        ],
        unique: true
    },
    first_name: {
        type: String,
        required: [
            true,
            "First name is required and must be at least two characters long"
        ],
        minlength: [2, "First name must be at least two characters long."],
        maxlength: [50, "First name cannot be longer than 50 characters"],
        validate: {
            validator: isAlpha,
            message: "First name must contain latin letters only"
        }
    },
    last_name: {
        type: String,
        required: [
            true,
            "Last name is required and must be at least two characters long"
        ],
        minlength: [2, "Last name must be at least two characters long."],
        maxlength: [50, "Last name cannot be longer than 50 characters"],
        validate: {
            validator: isAlpha,
            message: "Last name must contain latin letters only"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        maxlength: [50, "Password cannot be longer than 50 characters"],
        validate: {
            validator: password => {
                return (
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
                        password
                    ) && password.length >= 8
                );
            },
            message:
                "Password must contain at least one number, at least one symbol ($@!%*#?&), and be at least 8 characters long"
        }
    },
    birthday: {
        type: [Date, "Birthday must be a valid date"],
        required: [true, "Birthday is required"],
        validate: {
            validator: birthday => {
                let bday13 = birthday[0].setFullYear(
                    birthday[0].getFullYear() + 13
                );
                let today = new Date();
                return bday13 < today;
            },
            message: "You must be at least 13 years old to register"
        }
    }
});

UserSchema.pre("save", function(next) {
    let doc = this;
    bcrypt.hash(doc.password, 10, (err, hash) => {
        if (err) {
            next(err);
        } else {
            doc.password = hash;
            next();
        }
    });
});

UserSchema.methods.checkPassword = function(password, user_id) {
    let doc = this;
    let promise = new Promise((resolve, reject) => {
        bcrypt.compare(password, doc.password, (err, res) => {
            console.log(password);
            console.log(doc.password);
            console.log(res);
            console.log('user id in check pw', user_id);
            if (err) {
                reject(err);
            } else {
                resolve({res: res, user_id: user_id});
            }
        });
    });
    return promise;
};

mongoose.model("User", UserSchema);

function isAlpha(s) {
    return typeof s === "string" && /^[a-zA-Z]+$/.test(s);
}
