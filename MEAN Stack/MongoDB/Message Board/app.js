const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const formParser = bodyParser.urlencoded({ extended: true });

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mongoose_dashboard");

const MessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 4 },
        content: { type: String, required: true },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    },
    { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
    {
        _message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        name: { type: String, required: true, minlength: 4 },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
const Comment = mongoose.model("Comment", CommentSchema);

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let view_messages = [];
    Message.find({})
        .populate("comments")
        .exec((err, messages) => {
            err ? console.log(err) : (view_messages = messages);
            res.render("index", { messages: view_messages });
        });
});

app.post("/", formParser, (req, res) => {
    let message = new Message(req.body);
    message.save(err => {
        err ? console.log(err) : null;
        res.redirect("/");
    });
});

app.post("/comment", formParser, (req, res) => {
    Message.findOne({ _id: req.body.message_id }, (err, message) => {
        if (!err) {
            let comment = new Comment(req.body);
            comment._message = message._id;
            comment.save(err => {
                if (!err) {
                    message.comments.push(comment);
                    message.save(err => {
                        if (err) {
                            console.log(err);
                        }
                        res.redirect("/");
                    });
                } else {
                    console.log(err);
                    res.redirect("/");
                }
            });
        } else {
            console.log(err);
            res.redirect("/");
        }
    });
});

app.listen(8000, () => {
    console.log("server started");
});
