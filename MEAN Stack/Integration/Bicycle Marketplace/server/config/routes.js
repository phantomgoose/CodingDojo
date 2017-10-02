const path = require("path");
const users = require("../controllers/users.js");

module.exports = app => {

    app.post('/register', (req, res) => {
        console.log('got post to register', req.body);
        users.register(req, res);
    })

    app.all("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/dist/index.html"));
    });
};