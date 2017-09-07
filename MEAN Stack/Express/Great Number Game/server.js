const express = require("express");
const session = require("express-session");
const app = express();
const csrf = require("csurf");
const bodyParser = require("body-parser");

const csrfProt = csrf();
const formParser = bodyParser.urlencoded({ extended: true });

app.use(express.static(__dirname + "/static"));
app.use(session({ secret: "a large number of cats" }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", csrfProt, (req, res) => {
    if (!req.session.num_created) {
        req.session.random_number = Math.floor(Math.random() * 100 + 1);
        req.session.num_created = true;
    }
    res.render("index", {
        csrf_token: req.csrfToken(),
        answer: req.session.random_number
    });
});

app.post("/guess", formParser, (req, res) => {
    let num = req.session.random_number;
    let guess = req.body.guess;
    res.json({
        result: guess > num ? "high" : guess < num ? "low" : "correct"
    });
});

app.get('/reset', (req, res) => {
    req.session.num_created = false;
    res.redirect('/');
});

app.listen(8000, (req, res) => {
    console.log("server started");
});
