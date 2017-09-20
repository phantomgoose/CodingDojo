const message_board = require("../controllers/message_board.js");

module.exports = app => {
    app.get("/notes", (req, res) => {
        message_board.list(req, res);
    });

    app.post("/notes", (req, res) => {
        message_board.create(req, res);
    });

    app.all("*", (req, res) => {
        message_board.main(req, res);
    });
};
