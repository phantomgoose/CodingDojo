const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const formParser = bodyParser.urlencoded({ extended: true });

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mongoose_dashboard");

const RabbitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A rabbit name is required"]
        },
        color: {
            type: String,
            required: [true, "Fur color is required"]
        },
        pic: {
            type: String,
            required: [true, "Picture url must be provided"]
        }
    },
    { timestamps: true }
);

const Rabbit = mongoose.model("Rabbit", RabbitSchema);

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    Rabbit.find({}, (err, rabbits) => {
        err ? res.render("index") : res.render("index", { rabbits: rabbits });
    });
});

app.post("/rabbits", formParser, (req, res) => {
    let rabbit = new Rabbit({
        name: req.body.name,
        color: req.body.color,
        pic: req.body.pic
    });
    rabbit.save(err => {
        err ? console.log(err) : res.redirect("/");
    });
});

app.get("/rabbits/new", (req, res) => {
    res.render("rabbit-new");
});

app.get("/rabbits/edit/:id", (req, res) => {
    let rabbit = Rabbit.findOne({ _id: req.params.id }, (err, rabbit) => {
        err ? res.redirect("/") : res.render("rabbit-edit", { rabbit: rabbit });
    });
});

app.post('/rabbits/destroy/:id', (req, res) => {
   Rabbit.findOneAndRemove({ _id: req.params.id }, () => {
       res.redirect('/');
   }); 
});

app.post('/rabbits/:id', formParser, (req, res) => {
    Rabbit.findOneAndUpdate({ _id: req.params.id },
        {$set: {name: req.body.name, color: req.body.color, pic: req.body.pic}}, (err) => {
            err ? res.redirect('/') : res.redirect('/rabbits/' + req.params.id);
        });
});

app.get("/rabbits/:id", (req, res) => {
    let rabbit = Rabbit.findOne({ _id: req.params.id }, (err, rabbit) => {
        console.log(rabbit);
        err ? res.redirect("/") : res.render("rabbit", { rabbit: rabbit });
    });
});

app.get("/reset", (req, res) => {
    Rabbit.remove({}, err => {
        res.redirect("/");
    });
});

app.listen(8000, () => {
    console.log("server started");
});
