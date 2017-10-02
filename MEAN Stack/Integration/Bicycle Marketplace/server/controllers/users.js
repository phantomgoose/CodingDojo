const User = require("mongoose").model("User");
const Bike = require("mongoose").model("Bike");

module.exports = {
    test: () => {
        console.log("hit test");
        let user = new User({
            first_name: "Alex",
            last_name: "S",
            email: "lol",
            password: "kay"
        });
        user
            .save()
            .then(user => {
                console.log("saved user", user);
            })
            .catch(err => {
                console.log("error saving user", err);
            });
        let bike = new Bike({
            title: "Test title",
            description: "Test description",
            picture: "test picture",
            price: 2,
            location: "ajwodjwaidoj"
        });
        bike
            .save()
            .then(bike => {
                user.listings.push(bike);
                console.log("pushed bike into", user);
            })
            .catch(err => {
                console.log("could not push bike into user", err);
            });
    },

    register: (req, res) => {
        console.log("got here and got this request body", req.body);
        let user = new User(req.body);
        user
            .save()
            .then(user => {
                console.log("saved user", user);
                req.session.user_id = user._id;
                req.session.logged_in = true;
                res.json("ok");
            })
            .catch(err => {
                console.log("could not save user", err);
                res.json("err", err);
            });
    }
};
