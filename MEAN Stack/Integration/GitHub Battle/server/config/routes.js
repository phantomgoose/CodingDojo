const battle = require("../controllers/battle.js");

module.exports = function(app) {
    app.all("*", (req, res) => {
        battle.root(req, res);
    });
};
