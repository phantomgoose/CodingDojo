const path = require("path");

module.exports = {
    root: (req, res) => {
        res.sendFile("/public/dist/index.html", {
            root: path.join(__dirname, "../../")
        });
    }
};
