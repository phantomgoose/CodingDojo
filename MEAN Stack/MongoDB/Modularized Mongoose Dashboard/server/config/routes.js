const bodyParser = require("body-parser");
const formParser = bodyParser.urlencoded({ extended: true });
const rabbits = require('../controllers/rabbits.js');

module.exports = app => {
    app.get("/", (req, res) => {
        rabbits.root(req, res);
    });

    app.post("/rabbits", formParser, (req, res) => {
        rabbits.create(req, res);
    });

    app.get("/rabbits/new", (req, res) => {
        rabbits.new(req, res);
    });

    app.get("/rabbits/edit/:id", (req, res) => {
        rabbits.edit(req, res);
    });

    app.post("/rabbits/destroy/:id", (req, res) => {
        rabbits.destroy(req, res);
    });

    app.post("/rabbits/:id", formParser, (req, res) => {
        rabbits.update(req, res);
    });

    app.get("/rabbits/:id", (req, res) => {
        rabbits.show(req, res);
    });

    app.get("/reset", (req, res) => {
        rabbits.reset(req, res);
    });
};
