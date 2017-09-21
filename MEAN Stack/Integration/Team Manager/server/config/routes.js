const team_manager = require("../controllers/team_manager.js");

module.exports = app => {
    app.all("*", (req, res) => {
        team_manager.main(req, res);
    });
};
