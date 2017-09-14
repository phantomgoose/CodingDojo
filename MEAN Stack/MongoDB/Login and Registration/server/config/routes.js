const formParser = require("body-parser").urlencoded({ extended: true });
const csrfProt = require("csurf")();
const registration = require('../controllers/registration.js');

module.exports = function(app) {
    app.get("/", csrfProt, (req, res) => {
        registration.root(req, res);
    });
    app.post("/", formParser, csrfProt, (req, res) => {
        registration.register(req, res);
    });
    app.post('/session', formParser, csrfProt, (req, res) => {
        registration.login(req, res);
    })
    app.get('/profile', (req, res) => {
        registration.profile(req, res);
    })
    // for testing purposes
    app.get('/reset', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })
};