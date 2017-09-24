const battle = require("../controllers/battle.js");

module.exports = app => {
    app.get("/user/:username", (req, res) => {
        battle.getUser(req, res);
    });

    app.post("/players", (req, res) => {
        console.log("got post", req.body);
        battle.createPlayer(req, res);
    });

    app.all("*", (req, res) => {
        battle.root(req, res);
    });
};
