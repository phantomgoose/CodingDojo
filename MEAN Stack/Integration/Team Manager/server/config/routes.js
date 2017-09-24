const team_manager = require("../controllers/team_manager.js");

module.exports = app => {
    app.get("/players", (req, res) => {
        team_manager.list(req, res);
    });

    app.post("/players", (req, res) => {
        team_manager.create(req, res);
    });

    app.delete("/players/:short_id", (req, res) => {
        team_manager.deletePlayer(req, res);
    });

    app.patch("/players/:short_id", (req, res) => {
        team_manager.updateGameStatus(req, res);
    });

    app.all("*", (req, res) => {
        team_manager.main(req, res);
    });
};
