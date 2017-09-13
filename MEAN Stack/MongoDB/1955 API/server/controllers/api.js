const mongoose = require("mongoose");
const Birthday = mongoose.model("Bday");

module.exports = {
    list: (req, res) => {
        Birthday.find((err, bdays) => {
            err ? res.json(err) : res.json(bdays);
        });
    },
    create: (req, res) => {
        let bday = new Birthday(req.params);
        bday.save(err => {
            err ? res.json(err) : res.json(bday);
        });
    },
    delete: (req, res) => {
        Birthday.findOneAndRemove(req.params, err => {
            err
                ? res.json(err)
                : res.json({ response: "successfully removed name" });
        });
    },
    show: (req, res) => {
        Birthday.findOne(req.params, (err, obj) => {
            err ? res.json(err) : res.json(obj);
        });
    }
};
