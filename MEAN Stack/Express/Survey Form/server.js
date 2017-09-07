const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const csrf = require("csurf");

const parseForm = bodyParser.urlencoded({ extended: true });

const csrfProtection = csrf();

const app = express();

// super secure secret
app.use(session({ secret: "awdawd" }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", csrfProtection, (req, res) => {
    res.render("index", { csrf_token: req.csrfToken() });
});

app.post("/result", parseForm, csrfProtection, (req, res) => {
    result = {
        name: req.body.name,
        location: req.body.location,
        language: req.body.language,
        comment: req.body.comment
    };
    res.render("result", { result: result });
});

app.listen(8000, () => {
    console.log("server started");
});
