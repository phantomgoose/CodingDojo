const User = require("mongoose").model("User");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    root: (req, res) => {
        if (req.session.user_id) {
            res.redirect("/profile");
        } else {
            res.render("index", { csrf_token: req.csrfToken() });
        }
    },
    register: (req, res) => {
        let user = new User(req.body);
        user
            .save()
            .then(user => {
                req.session.user_id = user._id;
                res.redirect("/profile");
            })
            .catch(err => {
                returnErrors(res, err);
            });
    },
    login: (req, res) => {
        let promise = User.findOne({ email: req.body.email }).exec();
        promise
            .then(user => {
                if (!user) {
                    throw { pw_email: "Incorrect password or email." };
                } else {
                    return user.checkPassword(req.body.password, user._id);
                }
            })
            .then(pw_check_res => {
                let pwCorrect = pw_check_res.res;
                let user_id = pw_check_res.user_id;
                if (pwCorrect) {
                    req.session.user_id = user_id;
                    res.redirect("/profile");
                } else {
                    throw { pw_email: "Incorrect password or email." };
                }
            })
            .catch(err => {
                if (err.errors) {
                    returnErrors(res, err);
                } else if (err) {
                    returnJson(res, "error", err);
                }
            });
    },
    profile: (req, res) => {
        if (req.session.user_id) {
            User.findById(req.session.user_id)
                .exec()
                .then(user => {
                    res.render("profile", { name: user.first_name });
                })
                .catch(err => {
                    res.redirect("/");
                });
        } else {
            res.redirect("/");
        }
    }
};

function returnJson(res, status, content) {
    res.json({ response: status, content: content });
}

function returnErrors(res, mongoose_err) {
    let content = {};
    for (let error in mongoose_err.errors) {
        content[error] = mongoose_err.errors[error].message;
    }
    returnJson(res, "error", content);
}
