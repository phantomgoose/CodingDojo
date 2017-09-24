const battle = require("../controllers/battle.js");

module.exports = app => {
    app.get("/user/:username", (req, res) => {
        battle.getUser(req, res);
    });

    app.post("/players", (req, res) => {
        battle.createPlayer(req, res);
    });

    app.get("/players", (req, res) => {
        battle.getPlayers(req, res);
    });

    app.all("*", (req, res) => {
        battle.root(req, res);
    });
};
