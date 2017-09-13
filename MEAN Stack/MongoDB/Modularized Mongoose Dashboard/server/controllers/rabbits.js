const mongoose = require('mongoose');
const Rabbit = mongoose.model('Rabbit');

module.exports = {
    root: (req, res) => {
        Rabbit.find({}, (err, rabbits) => {
            err
                ? res.render("index")
                : res.render("index", { rabbits: rabbits });
        });
    },
    create: (req, res) => {
        let rabbit = new Rabbit({
            name: req.body.name,
            color: req.body.color,
            pic: req.body.pic
        });
        rabbit.save(err => {
            err ? console.log(err) : res.redirect("/");
        });
    },
    new: (req, res) => {
        res.render("rabbit-new");
    },
    edit: (req, res) => {
        let rabbit = Rabbit.findOne({ _id: req.params.id }, (err, rabbit) => {
            err
                ? res.redirect("/")
                : res.render("rabbit-edit", { rabbit: rabbit });
        });
    },
    destroy: (req, res) => {
        Rabbit.findOneAndRemove({ _id: req.params.id }, () => {
            res.redirect("/");
        });
    },
    update: (req, res) => {
        Rabbit.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    color: req.body.color,
                    pic: req.body.pic
                }
            },
            err => {
                err
                    ? res.redirect("/")
                    : res.redirect("/rabbits/" + req.params.id);
            }
        );
    },
    show: (req, res) => {
        let rabbit = Rabbit.findOne({ _id: req.params.id }, (err, rabbit) => {
            err ? res.redirect("/") : res.render("rabbit", { rabbit: rabbit });
        });
    },
    reset: (req, res) => {
        Rabbit.remove({}, err => {
            res.redirect("/");
        });
    }
}