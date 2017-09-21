const Player = require("../models/player.js");
const path = require('path');

module.exports = {
    main: (req, res) => {
        res.sendFile("/public/dist/index.html", { root: path.join(__dirname, '../../') });
    }
};
