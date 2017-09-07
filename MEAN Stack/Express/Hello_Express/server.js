const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'awjdoaijwdioajdoiajwd'}));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { title: "my Express project " });
});

app.get("/users", (req, res) => {
    var users_array = [
        { name: "Michael", email: "michael@codingdojo.com" },
        { name: "Jay", email: "jay@codingdojo.com" },
        { name: "Brendan", email: "brendan@codingdojo.com" },
        { name: "Andrew", email: "andrew@codingdojo.com" }
    ];
    res.render("users", { users: users_array });
});

app.get('/users/:id', (req, res) => {
    console.log('The user id requested is:', req.params.id);
    res.send('You have requested the user with id ' + req.params.id);
})

app.post("/users", (req, res) => {
    req.session.name = req.body.name;
    console.log(req.session);
    res.redirect("/");
});

app.listen(8000, () => {
    console.log("listening on port 8000");
});
