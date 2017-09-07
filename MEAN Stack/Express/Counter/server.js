const express = require("express");
const app = express();

let counter = 0;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    counter++;
    res.render("index", { counter: counter });
});

app.get('/two', (req, res) => {
    counter++;
    res.redirect('/');
})

app.get('/reset', (req, res) => {
    counter = 0;
    res.redirect('/');
})

app.listen(8000, () => {
    console.log('server started successfully');
})