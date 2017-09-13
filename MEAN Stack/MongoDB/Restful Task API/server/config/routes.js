const tasks = require("../controllers/tasks.js");

module.exports = app => {
    app.get("/", (req, res) => {
        tasks.list(req, res);
    });
    app.get("/:id", (req, res) => {
        tasks.retrieve(req, res);
    });
    app.post("/", (req, res) => {
        tasks.create(req, res);
    });
    app.put("/:id", (req, res) => {
        tasks.replace(req, res);
    });
    app.delete("/:id", (req, res) => {
        tasks.delete(req, res);
    });
};
