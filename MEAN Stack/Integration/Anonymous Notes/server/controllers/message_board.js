const path = require("path");
const Note = require("mongoose").model("Note");

module.exports = {
    main: (req, res) => {
        res.sendFile("/public/dist/index.html", { root: __dirname });
    },
    list: (req, res) => {
        Note.find({}, "-_id content createdAt")
            .sort("-createdAt")
            .then(notes => {
                res.json(notes);
            })
            .catch(err => {
                console.log(err);
            });
    },
    create: (req, res) => {
        let note = new Note(req.body);
        note
            .save()
            .then(note => {
                console.log('created note');
                res.json({ response: "ok" });
            })
            .catch(err => {
                console.log('did not create note');
                res.json({ response: "error", errors: err });
            });
    }
};
