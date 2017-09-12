const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const formParser = bodyParser.urlencoded({ extended: true });

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/quoting_dojo");

const QuoteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        quote: {
            type: String,
            required: [true, "Quote is required"]
        }
    },
    { timestamps: true }
);

const Quote = mongoose.model("Quote", QuoteSchema);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/quotes", (req, res) => {
    Quote.find({}, (err, quotes) => {
        err ? res.render("quotes") : res.render("quotes", { quotes: quotes });
    });
});

app.post("/quotes", formParser, (req, res) => {
    let quote = new Quote({ name: req.body.name, quote: req.body.quote });
    quote.save(err => {
        err ? res.redirect("/") : res.redirect("/quotes");
    });
});

app.listen(8000, () => {
    console.log("server started");
});
