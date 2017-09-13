const api = require("../controllers/api.js");

/*
GET '/' will serve up the full collection of people born in 1955
GET '/new/:name/' will add a name into the database which can be used for blank spaces. So adding Steve Jobs to our database, you'd type in the URL 'localhost:8000/new/Steve Jobs'
GET '/remove/:name/' will delete a name from the database.
GET '/:name' will bring up the document of that particular person.
*/

module.exports = app => {
    app.get("/", (req, res) => {
        api.list(req, res);
    });
    app.get("/new/:name", (req, res) => {
        api.create(req, res);
    });
    app.get("/remove/:name", (req, res) => {
        api.delete(req, res);
    });
    app.get('/:name', (req, res) => {
        api.show(req, res);
    })
};
